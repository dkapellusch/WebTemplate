import { PersonModel } from "@common/models/person.model";
import { Person } from "@persistence/models/person.model";
import { Job } from "@persistence/models/job.model";
import { JobModel } from "@common/models/job.model";
import { UserModel } from "@common/models/user.model";
import { Express } from "express-serve-static-core";
import { MongooseConnector } from "@persistence/mongooseConnector";
import { ServerInstances } from "../../instances.server";

export function configureApiRoutes(app: Express): void {

    app.get("/api/test", async (req, res) => {
        res.json(new UserModel("123", "123"));
    });

    app.get("/api/test2", (req, res) => {
        res.json({ message: "hi2!" });
    });

    app.post("/api/addPerson", async (req, res) => {
        let body = req.body;
        let p = new Person(new PersonModel(body.name));
        let j = new Job(new JobModel(body.job.title, body.job.salary));
        p.job = j;
        await p.save(async (err, doc) => {
            j.professionals
                .push(p);
            await j.save();
        });

        res.send(p);
    });
}