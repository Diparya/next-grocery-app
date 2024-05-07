import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
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
    image_url: { // Add new field for image URL
        type: String, // Assuming the image URL will be a string
        required: false, // Optional field
    },
    belongs:{
        type:mongoose.ObjectId,
        required: true,
    }
})

export const Product =mongoose.models.products || mongoose.model('products',ProductSchema)