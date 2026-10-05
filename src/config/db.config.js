import mongoose from "mongoose";
import ConfigDet from "./env.config.js";

const db = async () => {
    try {
        await mongoose.connect(ConfigDet.MongoUrl, {
            serverSelectionTimeoutMS: 10000
        });

        console.log("✅ Mongo Db Connected Successfully");
    }
    catch (e) {
        console.error("❌ Mongo error to connect");
        console.error(e.message);

        if (e.reason?.servers) {
            for (const [server, details] of e.reason.servers) {
                console.error("SERVER:", server);
                console.error("TYPE:", details.type);
                console.error("ERROR:", details.error?.message);
            }
        }
    }
}

export default db;