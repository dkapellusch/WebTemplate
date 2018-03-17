import { Schema, model, Model, Document } from 'mongoose';
import {  IPersonModel } from '../../../common/models/person.model';
import { Job } from './job.model';
const CollectionName = 'Persons';

export interface Person extends IPersonModel, Document {
	job: Job
}

const PersonSchema = new Schema({
	name: String,
	job: { type: Schema.Types.ObjectId, ref: 'Jobs', foreignField: "title" }
});

export const Person: Model<Person> = model(CollectionName, PersonSchema);
