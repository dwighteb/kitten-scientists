import { FrameContext } from "@kitten-science/kitten-scientists/Engine.js";
import { sleep } from "@oliversalzburg/js-utils/async/async.js";
import { AnyFunction } from "@oliversalzburg/js-utils/core.js";
import { isNil } from "@oliversalzburg/js-utils/data/nil.js";
import { compressToUTF16 } from "lz-string";
import { writeFileSync } from "node:fs";
import { exponentialBuckets, Histogram, linearBuckets } from "prom-client";
import { v4 as uuid } from "uuid";
import { AddressInfo, RawData, WebSocket, WebSocketServer } from "ws";
import { KGNetSaveFromAnalysts, KGNetSavePersisted, LOCAL_STORAGE_PATH } from "../globals.js";
import { KittenAnalystsMessage, KittenAnalystsMessageId } from "../KittenAnalysts.js";
import { cwarn } from "../tools/Log.js";
import { identifyExchange } from "../tools/MessageFormat.js";

interface RemoteConnection {
  ws: WebSocket;
  isAlive: boolean;
}
export class KittensGameRemote {
  location: string;
  port: number;
  pendingRequests = new Map<string, { resolve: AnyFunction; reject: AnyFunction }>();
  saveStore: Map<string, KGNetSavePersisted>;
  sockets = new Set<RemoteConnection>();
  wss: WebSocketServer;

  ks_iterate_duration = new Histogram({
    name: "ks_iterate_duration",
    help: "How long each iteration of KS took.",
    buckets: [...linearBuckets(0, 1, 100), ...exponentialBuckets(100, 1.125, 30)],
    labelNames: ["client_type", "guid", "location", "manager"] as const,
  });

  #lastKnownHeadlessSocket: RemoteConnection | null = null;

  constructor(saveStore: Map<string, KGNetSavePersisted>, port = 9093) {
    this.port = port;
    this.saveStore = saveStore;
    this.wss = new WebSocketServer({ port });
    this.location = `ws://${(this.wss.address() as AddressInfo | null)?.address ?? "localhost"}:${this.port}/`;

    this.wss.on("listening", () => {
      process.stderr.write(`WS server listening on port ${port}...\n`);
    });

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const host = this;
    this.wss.on("connection", ws => {
      ws.on("error", console.error);

      const socket = { ws, isAlive: true };
      this.sockets.add(socket);
      ws.on("pong", () => {
        socket.isAlive = true;
      });

      ws.on("message", function (data) {
        host.handleMessage(this, data);
      });

      void this.sendMessage({ type: "connected" });
    });

    const interval = setInterval(() => {
      [...this.sockets.values()].forEach(socket => {
        if (!socket.isAlive) {
          socket.ws.terminate();
          this.sockets.delete(socket);
          return;
        }

        socket.isAlive = false;
        socket.ws.ping();
      });
    }, 30000);

    this.wss.on("close", () => {
      clearInterval(interval);
    });
  }

  handleMessage(socket: WebSocket, data: RawData) {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    const message = JSON.parse(data.toString()) as KittenAnalystsMessage<KittenAnalystsMessageId>;

    if (message.location.includes("headless.html")) {
      this.#lastKnownHeadlessSocket = { isAlive: true, ws: socket };
    }

    if (!message.responseId) {
      switch (message.type) {
        case "reportFrame": {
          const payload = message.data as FrameContext;
          const delta = payload.exit - payload.entry;
          console.info(`=> Received frame report (${message.location}).`, delta);

          this.ks_iterate_duration.observe(
            {
              client_type: message.location.includes("headless.html") ? "headless" : "browser",
              guid: message.guid,
              location: message.location,
              manager: "all",
            },
            delta,
          );
          for (const [measurement, timeTaken] of Object.entries(payload.measurements)) {
            if (isNil(timeTaken)) {
              continue;
            }

            this.ks_iterate_duration.observe(
              {
                client_type: message.location.includes("headless.html") ? "headless" : "browser",
                guid: message.guid,
                location: message.location,
                manager: measurement,
              },
              timeTaken,
            );
          }

          return;
        }
        case "reportSavegame": {
          const payload = message.data as KGNetSaveFromAnalysts;
          console.info(`=> Received savegame (${message.location}).`);

          const isHeadlessReport = message.location.includes("headless.html");
          if (isHeadlessReport) {
            payload.telemetry.guid = "ka-internal-savestate";
          }

          const calendar = payload.calendar;
          const saveDataCompressed = compressToUTF16(JSON.stringify(payload));
          const savegame: KGNetSavePersisted = {
            archived: false,
            guid: payload.telemetry.guid,
            index: { calendar: { day: calendar.day, year: calendar.year } },
            label: isHeadlessReport ? "Background Game" : "Browser Game",
            saveData: saveDataCompressed,
            size: saveDataCompressed.length,
            timestamp: Date.now(),
          };

          this.saveStore.set(payload.telemetry.guid, savegame);
          try {
            writeFileSync(
              `${LOCAL_STORAGE_PATH}/${payload.telemetry.guid}.json`,
              JSON.stringify(savegame),
            );
            console.debug(`=> Savegame persisted to disc.`);
          } catch (error) {
            console.error("!> Error while persisting savegame to disc!", error);
          }

          return;
        }
        default:
          console.warn(`!> Report with type '${message.type}' is unexpected! Message ignored.`);
          return;
      }
    }

    if (!this.pendingRequests.has(message.responseId)) {
      console.warn(`!> Response ID '${message.responseId}' is unexpected! Message ignored.`);
      return;
    }

    const pendingRequest = this.pendingRequests.get(message.responseId);
    this.pendingRequests.delete(message.responseId);

    pendingRequest?.resolve(message);
    console.debug(`=> Request ID '${message.responseId}' was resolved.`);
  }

  sendMessage<TMessage extends KittenAnalystsMessageId>(
    message: Omit<KittenAnalystsMessage<TMessage>, "client_type" | "location" | "guid">,
  ): Promise<Array<KittenAnalystsMessage<TMessage> | null>> {
    const clientRequests = [...this.sockets.values()].map(socket =>
      this.#sendMessageToSocket(
        {
          ...message,
          client_type: "backend",
          guid: "ka-backend",
          location: this.location,
        },
        socket,
      ),
    );

    return Promise.all(clientRequests);
  }

  #sendMessageToSocket<TMessage extends KittenAnalystsMessageId>(
    message: KittenAnalystsMessage<TMessage>,
    socket: RemoteConnection,
  ): Promise<KittenAnalystsMessage<TMessage> | null> {
    const requestId = uuid();
    message.responseId = requestId;

    console.debug(`<= ${identifyExchange(message)}...`);

    const request = new Promise<KittenAnalystsMessage<TMessage> | null>((resolve, reject) => {
      if (!socket.isAlive || socket.ws.readyState === WebSocket.CLOSED) {
        console.warn("Send request can't be handled, because socket is dead!");
        socket.isAlive = false;
        resolve(null);
        return;
      }

      this.pendingRequests.set(requestId, { resolve, reject });
      socket.ws.send(JSON.stringify(message), error => {
        if (error) {
          reject(error);
        }
      });
    });

    return Promise.race([request, sleep(2000).then(() => null)]);
  }

  toHeadless<TMessage extends KittenAnalystsMessageId>(
    message: Omit<KittenAnalystsMessage<TMessage>, "client_type" | "location" | "guid">,
  ): Promise<KittenAnalystsMessage<TMessage> | null> {
    if (isNil(this.#lastKnownHeadlessSocket)) {
      cwarn("No headless connection registered. Message is dropped.");
      return Promise.resolve(null);
    }

    if (!this.#lastKnownHeadlessSocket.isAlive) {
      cwarn(
        "Trying to send to headless session, but last known headless socket is no longer alive. Request is dropped!",
      );
      return Promise.resolve(null);
    }

    return this.#sendMessageToSocket(
      {
        ...message,
        client_type: "backend",
        guid: "ka-backend",
        location: this.location,
      },
      this.#lastKnownHeadlessSocket,
    );
  }
}
