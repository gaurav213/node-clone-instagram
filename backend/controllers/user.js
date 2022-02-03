import User from "../models/User.js"
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email })
        if (user) {
            return res.
                status(400).
                json({ success: false, message: "User already exit" })
        }
        user = await User.create({
            name,
            email,
            password,
            avtar: { public_id: "sample_id", url: "sampleurl" },
        })
        const token = await user.generateToken();
        const option = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        res.status(201).cookie("token", token, option).json({
            success: true,
            user,
            token,
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json
                ({
                    success: false,

                    message: "User does not exits"
                })
        }
        const isMatch = await user.matchPassword(password)
        if (!isMatch) {
            return res.status(400).json({
                sucess: false,
                message: "Incorrect password",
            })
        }
        const token = await user.generateToken();
        const option = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        res.status(200).cookie("token", token, option).json({
            success: true,
            user,
            token,
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message
        }
        )
    }
}

export const logout = async (req, res) => {
    try {
        res.status(200).cookie("token", null, { expires: new Date(Date.now()), httpOnly: true }).json({
            success: true,
            message: "Logout"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const updatePassword = async (req, res) => {
    try {

        const user = await User.findById(req.user._id).select("+password")
        const {oldPassword,newPassword}=req.body;
        if(!oldPassword || !newPassword){
            return res.status(400).json({
                success:false,
                message:"provide old and new password",
            })
        
        }
        const isMatch= await user.matchPassword(oldPassword);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect Old password",
            })
        }
        user.password=newPassword;
        await user.save();
res.status(200).json({
    sucess:true,
    message:"Password updated"
})
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateprofile = async (req,res)=>{
try {
    const user = await User.findById(req.user._id);
    const{name,email}=req.body
    if(name){
user.name=name;
    }
    if(email){
        user.email=email
    }
    await user.save()
    res.status(200).json({
        success:true,
        message:"Profile updated"
    })
    
}catch (error) {
    res.status(500).json({
        success: false,
        message: message.error
    })
}
}

export default register
