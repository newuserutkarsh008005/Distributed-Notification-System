import Message from "../model/message.model.js";
import crypto from 'crypto'
import { createMessage } from "../utils/producer.redis.js";
import axios from "axios";
import { consumeMessage } from "../utils/consumer.redis.js";

export async function health(req,res) {
    return res.status(200).json({
        message: "Server is working"
    })
}

export async function sendMessage(req,res){
    const { name, to, message, subject } = req.body
    if(!name || !to || !message || !subject){
        return res.status(400).json({
            message: 'No proper data given'
        })
    }

    const id = crypto.randomUUID();
    const data = await Message.create({
        id,
        to,
        message,
        subject,
        name
    })

    await createMessage(data);

    try {
        await axios.post('https://serverworker-pink.vercel.app/api/auth/sendMessageMain', { id: data.id });
    } catch (err) {
        console.log("Server B failed:", err.response?.data || err.message);
    }

    return res.status(202).json({
        message: 'ReqAccepted'
    })
}


