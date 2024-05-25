import mongoose from "mongoose";


const converstionSchema=new mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    message:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            required:true
        }
    ]

},{timestamps:true})

const Conversation=mongoose.model("Conversation",converstionSchema)

export default Conversation