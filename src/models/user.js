import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name:String,
    email:{
        type: String,
        required: [true,"Email Required !!"],
    },
    password:{
        type:String,
        required: [true,"Password Required !!"],
    },
    role:{
        type: String,
        default:"user",
    }
})

export const User = mongoose.models.users || mongoose.model("users",UserSchema)