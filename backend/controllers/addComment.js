import Post from "../models/Post.js"

export const commentOnPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not Found"

            })
        }
        let commentIndex = -1
        //checking if commnet already exist
        post.comments.forEach((item, index) => {
            if (item.user.toString() === req.user._id.toString()) {
                commentIndex = index
            }

        });


        if (commentIndex !== -1) {
            post.comments[commentIndex].comment = req.body.comment
            await post.save();
            res.status(200).json({
                success: true,
                message: "comment updated"
            })
            return;

        } else {
            post.comments.push({
                user: req.user._id,
                comment: req.body.comment
            })
        }
        await post.save()
        res.status(200).json({
            success: true,
            message: "comment added"
        });


    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message
        })
    }
}

export const deleteCommnet = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        //checking ower delete commnet
        if (post.owner.toString() === req.user._id.toString()) {

            if (req.body.commentId == undefined) {
                return res.status(400).json({
                    success: false,
                    message: "Comment Id is required"
                })
            }

            post.comments.forEach((item, index) => {
                if (item._id.toString() === req.body.commentId.toString()) {
                    return post.comments.splice(index, 1)
                }

            });
            await post.save()
            res.status(200).json({
                success: true,
                message: "selected comment deleted"
            })


        } else {


            post.comments.forEach((item, index) => {
                if (item.user.toString() === req.user._id.toString()) {
                    return post.comments.splice(index, 1)
                }

            });
            await post.save()
            return res.status(200).json({
                success: true,
                message: "comment deleted"
            })
        }

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message
        })
    }

}
export default commentOnPost
