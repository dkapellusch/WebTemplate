import { Schema, model, Model, Document } from "mongoose";
import { IJobModel } from "../../../common/models/job.model";

const CollectionName = "Jobs";


interface Job extends IJobModel, Document { }

const JobSchema = new Schema({
    title: String,
    salary: Number,
    professionals: [{type: Schema.Types.ObjectId, ref: "Persons", foreignField: "name"}]
});

export const Job: Model<Job> = model(CollectionName, JobSchema);