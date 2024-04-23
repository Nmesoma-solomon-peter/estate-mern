import bcryptjs from 'bcryptjs';
import User from '../model/user.model.js';
import { errorHandler } from '../utils/error.js';

export const signup = async(req, res, next)=>{
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,15);
    const newUser = new User({username, email, password:hashedPassword});
    try {
        await newUser.save();
        res.status(201).json("successfully added user");
    } catch (error) {
        next(error);
    }
}