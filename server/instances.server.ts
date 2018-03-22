import { Server as WebSocketServer } from "ws";
import { Server as HttpServer } from "http";
import { Express } from "express-serve-static-core";
import { MongooseConnector } from "@persistence/mongooseConnector";

export class ServerInstances {
    static SOCKET_SERVER: WebSocketServer = null;
    static HTTP_SERVER: HttpServer = null;
    static CONFIGURATION: any = null;
    static MONGO_CONNECTION: MongooseConnector = null;
    static EXPRESS_APP: Express = null;
}