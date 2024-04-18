import {Schema, model} from "mongoose";

const logSchema = new Schema(
    {
        email: {
            type:String,
            required : true,
        },
        name: {
            type:String,
            required : true,
        },
        regNo: {
            type:String,
            required: true
        },
        type: {
            type:String,
            required : true,
        }
    },
    {timestamp:true, collection: 'EventEase', }
);
const EventLogs = model("EventEase", logSchema);

export default EventLogs;