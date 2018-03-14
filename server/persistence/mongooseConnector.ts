import * as mongoose from "mongoose";

export class mongooseConnector {

    private _connected = false;

    constructor(private connectionString : string) {
        (mongoose.Promise as any) = global.Promise;
    }

    public async Connect() : Promise < any > {
        if(!this._connected) {
            await mongoose.connect(this.connectionString);
            this._connected = true;
        }
    }

    public get Connection() : mongoose.Connection {
        if(!this._connected) {
            this.Connect().catch(e => console.log(e));
        }

        return mongoose.connection;
    }
}