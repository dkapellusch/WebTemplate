import { Schema, model, Model, Document } from "mongoose";
import * as uniqueValidator from "mongoose-unique-validator";
import { IUserModel } from "@common/models/user.model";

const CollectionName = "Users";

interface IUser extends IUserModel, Document {}

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createDate: Date,
  role: Number
});

UserSchema.plugin(uniqueValidator);
export const User: Model<IUser> = model<IUser>(CollectionName, UserSchema);
