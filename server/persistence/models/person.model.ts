import { Schema, model, Model, Document } from 'mongoose';
import {  IPersonModel } from '../../../common/models/person.model';
const CollectionName = 'Persons';

interface Person extends IPersonModel, Document {}

const PersonSchema = new Schema({
	name: String,
	job: { type: Schema.Types.ObjectId, ref: 'Jobs', foreignField: "title" }
});

export const Person: Model<Person> = model(CollectionName, PersonSchema);
