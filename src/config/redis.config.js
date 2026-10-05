import { createClient } from "redis";
import ConfigDet from "./env.config.js";

export const redisClient=createClient({
    url:ConfigDet.RedisUrl,
    socket: {
        tls: true
    }
})

redisClient.on('error',(err)=>{
    console.log(err)
})

const connectRedis=async ()=>{
    try{
        await redisClient.connect();
        console.log("Connected Redis Sucessfully");
    }
    catch(e){
        console.log(e.message);
    }
}
export default connectRedis
