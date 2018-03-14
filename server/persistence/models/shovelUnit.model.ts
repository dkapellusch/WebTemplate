import { Schema, model, Model, } from "mongoose";
import { ShovelLoadActivitiesSchema } from "./shovelLoadActivities.model";
import { ShovelUnit } from "../../model-types/shovelUnit.model.type";

const CollectionName = "ShovelUnit";

const ShovelUnitSchema = new Schema({
    name: String,
    fill_kwps: Number,
    swing_kwps: Number,
    dump_kwps: Number,
    return_kwps: Number
});

export const shovelUnit:Model<ShovelUnit> = model(CollectionName, ShovelUnitSchema);