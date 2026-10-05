import dotenv from "dotenv"

dotenv.config()

//Mongo Url String Check

if(!process.env.MongoUrl){
    throw new Error("Mongo Url is Not There")
}
if(!process.env.RedisUrl){
    throw new Error("Redis Url is Absent")
}
if(!process.env.pass){
    throw new Error("Password is Absent")
}
if(!process.env.user){
    throw new Error("User is Absent")
}
const ConfigDet={
    MongoUrl:process.env.MongoUrl,
    RedisUrl:process.env.RedisUrl,
    user:process.env.user,
    pass:process.env.pass
}

export default ConfigDet