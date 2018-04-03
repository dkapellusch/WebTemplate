import { JobModel } from "./job.model";

export interface IPersonModel {
    name: string;
    job: JobModel;
}

export class PersonModel implements IPersonModel {
    constructor(public name: string, public job: JobModel = null) {}
}