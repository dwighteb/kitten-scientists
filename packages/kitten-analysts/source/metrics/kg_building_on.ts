import { ucfirst } from "@kitten-science/kitten-scientists/tools/Format.js";
import { KittensGameRemote, MessageCache } from "../entrypoint-backend.js";
import { gaugeFactory } from "./factory.js";

export const kg_building_on = (cache: MessageCache, remote: KittensGameRemote) =>
  gaugeFactory({
    cache,
    remote,
    help: "How many of the given building are turned on.",
    name: "kg_building_on",
    labelNames: ["client_type", "client_type", "guid", "name", "label", "location", "tab"],
    require: "getBuildings",
    extract(client_type, guid, location, element, subject) {
      subject.set(
        {
          client_type,
          guid,
          label: ucfirst(element.label),
          location,
          name: element.name,
          tab: element.tab,
        },
        element.on,
      );
    },
  });
