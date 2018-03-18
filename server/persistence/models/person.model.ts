import { Schema, model, Model, Document } from 'mongoose';
import {  IPersonModel } from '@common/models/person.model';
import { IJob } from './job.model';
const CollectionName = 'Persons';

export interface IPerson extends IPersonModel, Document {
	job: IJob
}

const PersonSchema = new Schema({
	name: String,
	job: { type: Schema.Types.ObjectId, ref: 'Jobs', foreignField: "title" }
});

export const Person: Model<IPerson> = model<IPerson>(CollectionName, PersonSchema);
