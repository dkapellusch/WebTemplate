import {Express} from "express-serve-static-core";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { configureApiRoutes } from "./http/api.configuration.server";
import {configureStaticRoutes } from "./http/static.configuration.server";
import { configureSocketServer } from "./webSocket.configuration.server";
import {Server as WebSocketServer} from "ws";
import {Server as HttpServer} from "http";
import { configureHttpServer } from "./http/http.configuration.server";

export class ServerInstances {
    static SOCKET_SERVER: WebSocketServer = null;
    static HTTP_SERVER: HttpServer = null;
}

function configureExpressPlugins(app : Express) : void {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
}

function initializeServerInstances(app: Express): void {
    ServerInstances.HTTP_SERVER = configureHttpServer(app);
    ServerInstances.SOCKET_SERVER = configureSocketServer(ServerInstances.HTTP_SERVER);

}

export function configureServer(app : Express) : void {
    configureExpressPlugins(app);
    initializeServerInstances(app);
    configureApiRoutes(app);
    configureStaticRoutes(app);
}