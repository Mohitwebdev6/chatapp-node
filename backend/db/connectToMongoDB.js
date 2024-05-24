import mongoose from "mongoose";

export const connectToMongoDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Successfully connected to MongoDB")
    }
    catch(error){
        console.log("Error while connecting to mogodb",error.message)
    }
}