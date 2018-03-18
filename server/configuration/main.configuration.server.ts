import { Express } from "express-serve-static-core";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as path from "path";
import { readFileSync } from "fs";
import { configureApiRoutes } from "./http/api.configuration.server";
import { configureStaticRoutes } from "./http/static.configuration.server";
import { configureSocketServer } from "./webSocket.configuration.server";
import { Server as WebSocketServer } from "ws";
import { Server as HttpServer } from "http";
import { configureHttpServer } from "./http/http.configuration.server";
import { MongooseConnector } from "../persistence/mongooseConnector";
import { isNullOrUndefined } from "util";

export class ServerInstances {
    static SOCKET_SERVER: WebSocketServer = null;
    static HTTP_SERVER: HttpServer = null;
    static CONFIGURATION: any = null;
    static MONGO_CONNECTION: MongooseConnector = null;
}

function configureExpressPlugins(app: Express): void {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
}

function initializeServerInstances(app: Express): void {
    ServerInstances.HTTP_SERVER = configureHttpServer(app);
    ServerInstances.SOCKET_SERVER = configureSocketServer(ServerInstances.HTTP_SERVER);

}

function readConfiguration() {
    const CONFIG_PATH = path.resolve(process.cwd(), "./server/configuration/server.config.json");
    ServerInstances.CONFIGURATION = JSON.parse(readFileSync(CONFIG_PATH).toString());
}

function initializeDatabaseConnection(connectionString: string = ServerInstances.CONFIGURATION.ConnectionStrings.Local) {
    ServerInstances.MONGO_CONNECTION = new MongooseConnector(connectionString);
    ServerInstances.MONGO_CONNECTION.Connect();
}

export function configureServer(app: Express): void {
    readConfiguration();
    initializeDatabaseConnection();
    configureExpressPlugins(app);
    initializeServerInstances(app);
    configureApiRoutes(app);
    configureStaticRoutes(app);
}