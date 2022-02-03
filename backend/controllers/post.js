
import Post from "../models/Post.js"
import User from "../models/User.js"
 const createPost= async (req,res)=>{
    try {
        const newPostData={
            caption:req.body.caption,
            image:{
                public_id:"req.body.public_id",
                url:"req.body.url"
            },
            owner:req.user._id
        }
       
        const post= await Post.create(newPostData);
        const user = await User.findById(req.user._id)
    //    console.log(user.Post)
         user.Post.push(post._id)
        
        await user.save();
        res.status(201).json({
            success:true,
            post,
        })
    } catch (error) {
        res.status(500).json({
            sucess:false,
            message:error.message
        })
    }
}


export default createPost

