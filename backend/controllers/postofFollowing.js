import User from "../models/User.js"
import Post from "../models/Post.js"
const getPostOfFollowing = async (req, res) => {
    try {

        const user = await User.findById(req.user._id)

        const posts = await Post.find({
            owner: {
                $in: user.following
            }
        })
        res.status(200).json({
            success: true,
            posts,

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: message.error
        })
    }
}
export default getPostOfFollowing