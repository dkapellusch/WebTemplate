import {Express} from "express-serve-static-core";
import {createServer} from "http";
import {Server as HttpServer} from "http";

export function configureHttpServer(app : Express): HttpServer {
    return createServer(app);
}