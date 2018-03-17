import * as express from "express";
import * as path from "path";
import * as http from "http";

import {readFileSync} from "fs";
import {MongooseConnector} from "./persistence/mongooseConnector";
import {configureServer, ServerInstances} from "./configuration/main.configuration.server";

const PORT = process.env.PORT || 8080;
const APP = express();

const CONFIG_PATH = path.resolve(__dirname, "./configuration/server.config.json");
const CONFIG_FILE = readFileSync(CONFIG_PATH).toString();
const CONNECTION_STRING = JSON
    .parse(CONFIG_FILE)
    .ConnectionStrings
    .Local;

const DB_CONNECTOR = new MongooseConnector(CONNECTION_STRING);
DB_CONNECTOR.Connect();

configureServer(APP)

ServerInstances.HTTP_SERVER.listen(PORT, () => {
    console.log(`Node server listening on http://localhost:${PORT}`);
});
