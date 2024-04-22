import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import route from './routes/user.route.js';
dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("db connected succefully....");
}).catch((err)=>{
    console.log(err);
})

const app = express();

app.use('/api/user',route);

app.listen(3000,()=>{
    console.log("server is listening on port 3000");
})