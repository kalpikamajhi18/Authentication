import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/users_db")
        console.log("database connected")
    }
    catch(err){
        console.error(err.message)
    }
}

export default connectDB