import {Role} from "../enums/role.enum";

export interface IUserModel {
    userName : string,
    password : string,
    createDate : Date,
    role : Role
}

export class UserModel implements IUserModel {
    constructor(public userName : string, public password : string, public createDate : Date = new Date(), public role : Role = Role.ReadOnly) {}
}
