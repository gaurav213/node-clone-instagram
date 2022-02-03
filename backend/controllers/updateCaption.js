import Post from "../models/Post.js"
import User from "../models/User.js"

const updateCaption = async (req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success:false,
                message:"Post not Found"
            });
            

        }
      if(post.owner.toString()!== req.user._id.toString()){
          return res.status(401).json({
              success:false,
              message:"Unauthorised"
          })
      }  
      post.caption=req.body.caption;
      await post.save();
      res.status(200).json({
          success:true,
          message:"Post updated"
      })
        
    }  catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export default updateCaption