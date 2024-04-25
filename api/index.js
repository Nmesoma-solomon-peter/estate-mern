import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import route from './routes/user.route.js';
import router from './routes/auth.route.js';
dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("db connected succefully....");
}).catch((err)=>{
    console.log(err);
})

const app = express();
app.use(express.json());
app.use('/api/user',route);
app.use('/api/auth',router)

//middleware
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error'
    return res.status(statusCode).json({
        successful: false,
        statusCode,
        message
    })
});

app.listen(4000,()=>{
    console.log("server is listening on port 4000");
})