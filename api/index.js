import express from 'express'
const app = express()
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import auth from './routes/auth.js'
import hotels from './routes/hotels.js'
import rooms from './routes/rooms.js'
import users from './routes/users.js'
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to mongodb")
    } catch (error) {
        throw error
    }
}
/*
app.get("/" , (req,resp) =>{
    resp.send("Hello first end point")
})
*/

//middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth' , auth);
app.use('/api/hotels' , hotels);
app.use('/api/rooms' , rooms);
app.use('/api/users' , users);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });


app.listen(process.env.PORT, () => {
    connect();
    console.log("Connected to backend")
})