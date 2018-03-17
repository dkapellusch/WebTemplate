import { Schema, model, Model, Document } from "mongoose";
import { IJobModel } from "../../../common/models/job.model";
import {Person} from './person.model';

const CollectionName = "Jobs";


export interface Job extends IJobModel, Document {
    professionals: Person[]
 }

const JobSchema = new Schema({
    title: String,
    salary: Number,
    professionals: [{type: Schema.Types.ObjectId, ref: "Persons", foreignField: "name"}]
});

export const Job: Model<Job> = model(CollectionName, JobSchema);