import { redisClient } from "../config/redis.config.js";
import Message from "../model/message.model.js";
import { sendEmailTo } from "./mail.utils.js";

export async function consumeMessage() {

    while (true) {

        const job = await redisClient.lPop("messageQueue");

        if (!job) {
            break;
        }

        const data = JSON.parse(job);

        try {

            console.log("Consumer is doing");

            const detail = await Message.findOne({
                id: data.id
            });

            if (!detail) {
                throw new Error("Message not found");
            }

            await sendEmailTo(
                detail.to,
                detail.subject,
                detail.message
            );

            await Message.updateOne(
                { id: data.id },
                { status: "Completed" }
            );

        } catch (e) {

            console.log(e.message);

            await redisClient.rPush(
                "messageQueue",
                job
            );

            await Message.updateOne(
                { id: data.id },
                { status: "Pending" }
            );
        }
    }
}