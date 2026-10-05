import { redisClient } from "../config/redis.config.js";

export async function createMessage(data) {
    try{
        redisClient.rPush(
            'messageQueue',
            JSON.stringify(data)
        );
        console.log("Data Pushed");
    }
    catch(e){
        console.log(e.message);
    }
}