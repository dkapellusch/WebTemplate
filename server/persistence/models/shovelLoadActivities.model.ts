import { Document, Schema, Model, model } from 'mongoose';
import { ShovelActivity } from '../../model-types/shovelActivity.model.type';

const CollectionName = 'ShovelLoadActivities';

export const ShovelLoadActivitiesSchema = new Schema({
	machine_name: String,
	start_date_stamp: String,
	start_time_stamp: String,
	shift_description: String,
	end_time_stamp: String,
	digability: Number,
	payload: Number,
	gross_weight: Number,
	fill_time: Number,
	swing_time: Number,
	dump_time: Number,
	return_time: Number,
	wait_on_truck_time: Number,
	swing_angle: Number,
	return_swing_angle: Number,
	Truck_Payload: Number,
	passes_count: Number,
	truck_target_capacity: Number
});

export const shovelActivity: Model<ShovelActivity> = model(CollectionName, ShovelLoadActivitiesSchema);
