import {Document } from "mongoose";

export interface ShovelUnit extends Document {
    name: string,
    fill_kwps: number,
    swing_kwps: number,
    dump_kwps: number,
    return_kwps: number
}