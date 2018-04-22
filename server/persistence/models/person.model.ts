import { Schema, model, Model, Document } from "mongoose";
import { IPersonModel } from "@common/models/person.model";
import { IJobModel } from "@common/models/job.model";

const CollectionName = "Persons";

interface IPerson extends IPersonModel, Document {
  job: IJobModel;
}

const PersonSchema = new Schema({
  name: String,
  job: { type: Schema.Types.ObjectId, ref: "Jobs", foreignField: "title" }
});

export const Person: Model<IPerson> = model<IPerson>(
  CollectionName,
  PersonSchema
);
