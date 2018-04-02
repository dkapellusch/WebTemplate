import { PersonModel, IPersonModel } from "./person.model";

export interface IJobModel {
    title: string,
    salary: number,
    professionals: IPersonModel[]
}

export class JobModel implements IJobModel {
    constructor(public title: string, public salary: number, public professionals: IPersonModel[] = []) {}
}