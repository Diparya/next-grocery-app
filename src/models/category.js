import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
    c_name:{
        type:String,
        unique:true,
        required:[true, 'Title is required'],
    },
    is_approved:{
        type:Boolean,
        default:false,
    },
    is_delete:{
        type:Boolean,
        default:false,
    }
})

export const Category =mongoose.models.categories || mongoose.model('categories',CategorySchema)