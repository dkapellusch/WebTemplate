import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import { readFileSync } from "fs";
import { MongooseConnector } from "./persistence/mongooseConnector";
import { Person } from "./model-types/person.model";

(async function() {
    const PORT = process.env.PORT || 8080;
    const APP = express();
    const CONFIG_PATH = path.resolve(__dirname, "./server.config.json");
    const CONFIG_FILE = readFileSync(CONFIG_PATH).toString();
    const CONNECTION_STRING = JSON
        .parse(CONFIG_FILE)
        .ConnectionStrings
        .Local;
    const DB_CONNECTOR = new MongooseConnector(CONNECTION_STRING);

    await DB_CONNECTOR.Connect();

    APP.use(bodyParser.json());
    APP.use(bodyParser.urlencoded({ extended: false }));

    APP.get("/api/test", (req, res) => {
        res.json({ message: "hi!" });
    });

    APP.get("/api/test2", (req, res) => {
        res.json({ message: "hi2!" });
    });

    APP.post("/api/addPerson", (req, res) => {
        const body = req.body;
        const person = new Person({ name: body.name });
        person.save();
        res.send(person);
    });

    APP.use(express.static(path.resolve(__dirname, "../dist/")));

    APP.get("*", (err, res) => {
        res.sendFile(path.resolve(__dirname, "../dist/index.html"));
    });

    APP.listen(PORT, () => {
        console.log(`Node server listening on http://localhost:${PORT}`);
    });
})();