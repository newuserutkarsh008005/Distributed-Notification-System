const db = async () => {
    try {
        await mongoose.connect(ConfigDet.MongoUrl, {
            family: 4,
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000
        })

        console.log("✅ Mongo Db Connected Successfully")
    } catch (e) {
        console.error("❌ Mongo error to connect:", e.message)
        throw e
    }
}