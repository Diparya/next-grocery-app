import mongoose, { Schema } from "mongoose";

const DemoSchema = new Schema({
    p_name:{
        type:String,
        unique:true,
        required:[true, 'Title is required'],
    },
    p_unit:{
        type:String,
        required:[true, 'Unit is required'],
    },
    p_rate:{
        type:Number,
        required:[true, 'rate is required'],
    },
    p_quantity:{
        type:Number,
        required:[true, 'quantity is required'],
    },
    belongs:{
        type:mongoose.ObjectId,
        required: true,
    }
})

export const Demo =mongoose.models.demo || mongoose.model('demo',DemoSchema)