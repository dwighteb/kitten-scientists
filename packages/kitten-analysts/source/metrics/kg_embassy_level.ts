import { ucfirst } from "@kitten-science/kitten-scientists/tools/Format.js";
import { MessageCache } from "../entrypoint-backend.js";
import { KittensGameRemote } from "../network/KittensGameRemote.js";
import { gaugeFactory } from "./factory.js";

export const kg_embassy_level = (cache: MessageCache, remote: KittensGameRemote) =>
  gaugeFactory({
    cache,
    remote,
    help: "How many embassies have been built for the given race.",
    name: "kg_embassy_level",
    labelNames: ["client_type", "guid", "name", "label", "location"] as const,
    require: "getRaces",
    extract(client_type, guid, location, element, subject) {
      subject.set(
        {
          client_type,
          guid,
          label: ucfirst(element.title),
          location,
          name: element.name,
        },
        element.embassyLevel,
      );
    },
  });
