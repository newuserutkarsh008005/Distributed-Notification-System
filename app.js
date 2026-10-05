import express from 'express'
import db from './src/config/db.config.js'
import messageRouter from './src/routes/message.route.js';
import connectRedis from './src/config/redis.config.js';
const app=express();
await db()
await connectRedis()
app.use(express.json())
app.use('/api/auth',messageRouter)
export default app