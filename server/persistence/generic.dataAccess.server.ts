import { ServerInstances } from "@server/instances.server";
import { Collection } from "mongodb";

export function getData<T>(collection: string): Collection<T> {
  return ServerInstances.MONGO_CONNECTION.Connection.db.collection<T>(
    collection
  );
}
