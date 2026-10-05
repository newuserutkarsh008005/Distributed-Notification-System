import express from 'express'
import db from './src/config/db.config.js'
import messageRouter from './src/routes/message.route.js';
import connectRedis from './src/config/redis.config.js';
const app=express();
db()
connectRedis()
app.use(express.json())
app.use('https://distributed-notification-system-mvxymqu4n.vercel.app/api/auth',messageRouter)
export default app