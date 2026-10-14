import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'Pending'
    },
    attempts:{
        type:Number,
        default:0
    }
})
const Message=mongoose.model("Message Detail",messageSchema);
export default Message