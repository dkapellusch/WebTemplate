import {Document} from "mongoose";
export interface ShovelActivity extends Document {
    machine_name : string;
    start_date_stamp : string,
    start_time_stamp : string,
    shift_description : string,
    end_time_stamp : string,
    digability : number,
    payload : number,
    gross_weight : number,
    fill_time : number,
    swing_time : number,
    dump_time : number,
    return_time : number,
    wait_on_truck_time : number,
    swing_angle : number,
    return_swing_angle : number,
    Truck_Payload : number,
    passes_count : number,
    truck_target_capacity : number
}