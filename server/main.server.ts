import * as express from "express";
import * as path from "path";
import * as http from "http";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { readFileSync } from "fs";
import { MongooseConnector } from "./persistence/mongooseConnector";
import { Person } from "./persistence/models/person.model";
import { PersonModel } from "../common/models/person.model";
import { Job } from "./persistence/models/job.model";
import { JobModel } from "../common/models/job.model";
import { InitializeSocketServer } from "./webSocketHandler.server";

(async function() {
    const PORT = process.env.PORT || 8080;
    const APP = express();
    const HTTP_SERVER = http.createServer(APP);
    const SOCKET_SERVER = InitializeSocketServer(HTTP_SERVER);
    const CONFIG_PATH = path.resolve(__dirname, "./server.config.json");
    const CONFIG_FILE = readFileSync(CONFIG_PATH).toString();
    const CONNECTION_STRING = JSON
        .parse(CONFIG_FILE)
        .ConnectionStrings
        .Local;
    const DB_CONNECTOR = new MongooseConnector(CONNECTION_STRING);

    await DB_CONNECTOR.Connect();
    
    // let p = new Person( new PersonModel("test"));
    // let j = new Job(new JobModel("Janitor", 33_000, [p]));
    // p.job = j;
    
    // await j.save();
    // await p.save();
    // let myPerson = await Person.findOne({}).exec();
    // let myJob = await Job.findOne({}).populate({path:"professionals"}).exec();
    APP.use(cors())
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