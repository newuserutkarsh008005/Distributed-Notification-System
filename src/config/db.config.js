import mongoose from "mongoose";
import ConfigDet from "./env.config.js";


const db=async()=>{
    try{
        await mongoose.connect(ConfigDet.MongoUrl);
        console.log("Mongo Db Connected Sucessfully")
    }
    catch(e){
        console.log("Mongo error to connect",e.message);
    }
}
export default db;