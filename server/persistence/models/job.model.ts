import { Schema, model, Model, Document } from "mongoose";
import { IJobModel } from "../../../common/models/job.model";
import {IPerson} from './person.model';

const CollectionName = "Jobs";


export interface IJob extends IJobModel, Document {
    professionals: IPerson[]
 }

const JobSchema = new Schema({
    title: String,
    salary: Number,
    professionals: [{type: Schema.Types.ObjectId, ref: "Persons", foreignField: "name"}]
});

export const Job: Model<IJob> = model<IJob>(CollectionName, JobSchema);