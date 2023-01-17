import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import UserRoute from './routes/UserRoute.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(UserRoute)

app.listen(5000, () => console.log('Server berjalan di http://localhost:5000'))