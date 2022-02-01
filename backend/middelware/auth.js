import User from "../models/User.js"
import  Jwt from "jsonwebtoken";

const isAuthenticated = async (req,res,next)=>{
    try {
        const {token}= req.cookies;
    if (!token){
        res.status(401).json({
            message:"Please Login Frist"
        })
    }
const decoded = await Jwt.verify(token,process.env.JWT_SECRET);
req.user=await User.findById(decoded._id);
next();
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

export default isAuthenticated