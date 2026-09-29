import mongoose from "mongoose";
import connectDB from "./db.js";

connectDB()
const userschema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true, lowercase:true, trim:true},
    password: {type:String, required:true }
}, {timestamps:true})

const usermodel = mongoose.model("user", userschema)
export default usermodel;