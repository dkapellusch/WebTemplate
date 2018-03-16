import { Schema, model, Model, Document } from "mongoose";

const CollectionName = "Persons";

export interface Person extends Document {
    name: string;
}

const PersonSchema = new Schema({
    name: String
});

export const Person: Model<Person> = model(CollectionName, PersonSchema);