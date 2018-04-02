import { Express } from "express-serve-static-core";
import { Server as HttpServer, createServer } from "http";

export function configureHttpServer(app: Express): HttpServer {
    return createServer(app);
}