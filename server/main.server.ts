import * as express from "express";
import * as http from "http";

import { configureServer, ServerInstances } from "./configuration/main.configuration.server";

const PORT = process.env.PORT || 8080;
const APP = express();

configureServer(APP);
ServerInstances.HTTP_SERVER.listen(PORT, () => {
    console.log(`Node server listening on http://localhost:${PORT}`);
});