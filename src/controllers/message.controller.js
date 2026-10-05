import Message from "../model/message.model.js";
import crypto from 'crypto'
import { createMessage } from "../utils/producer.redis.js";
import axios from "axios";
import { consumeMessage } from "../utils/consumer.redis.js";
export async function health(req,res) {
    res.status(200).json({
        'message':"Server is workign "
    })
}

export async function sendMessage(req,res){
    const{name,to,message,subject}=req.body
    if(!name||!to||!message||!subject){
        return res.status(404).json({
            'message':'No Proper data given'
        })
    }
    console.log(name,to,message,subject);
    const id=crypto.randomUUID();
    const data=await Message.create({
        id:id,
        to:to,
        message:message,
        subject:subject,
        name:name

    })
    console.log(data);

    await createMessage(data);
    
 axios.post('https://distributed-notification-system-chi.vercel.app/api/auth/sendMessageMain',
    {id}
 ).catch(err=>{
    console.log("Server B failed:", err.message);
 })
return res.status(202).json({
        'message':'ReqAccepted'
    })

}
export async function sendMessageMain(req,res) {
    const {id}=req.body;
    consumeMessage(id);
    return res.status(200).json({
        "message":"Done"
    })
    
}