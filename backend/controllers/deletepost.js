import Post from "../models/Post.js"
import User from "../models/User.js"
const deletePost = async (req,res)=>{
try {
    const post = await Post.findById(req.params.id)
    
    if(!post){
        return res.status(404).json({
            success:false,
            message:"Post not found"
        })
    }
    
    if(post.owner.toString() !== req.user._id.toString()){
        return res.status(401).json({
            success:false,
            message:"Unauthorixed"
        })
    }
    
    await post.remove();
    const user = await User.findById(req.user._id);
    
    const index = user.posts.indexOf(req.params.id)
    user.posts.splice(index, 1);
    await user.save();


    res.status(200).json({
        success:true,
        message:"Post deleted"
    });
} catch (error) {
    res.status(500).json({
        success:true,
        message:error.message
    }) 
 }
}



export default deletePost;
