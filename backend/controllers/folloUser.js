import User from "../models/User.js"

const followUser = async (req, res) => {
    try {

        const userToFollow = await User.findById(req.params.id)
        const loggedInUser = await User.findById(req.user._id);
        //  console.log(userToFollow)
        if (!userToFollow) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })

        }
        if (loggedInUser.following.includes(userToFollow._id)) {


            const indexfollowers = userToFollow.followers.indexOf(loggedInUser._id)
            userToFollow.followers.splice(indexfollowers, 1)

            const indexfollowing = loggedInUser.following.indexOf(userToFollow._id)
            loggedInUser.following.splice(indexfollowing, 1)



            await loggedInUser.save();
            await userToFollow.save()
            res.status(200).json({
                success: true,
                message: "user unfollow"
            })

        } else {




            loggedInUser.following.push(userToFollow._id)
            userToFollow.followers.push(loggedInUser._id)
            await loggedInUser.save()
            await userToFollow.save()
            res.status(200).json({
                success: true,
                message: "user follow"
            })
        }
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message
        }
        )
    }
}

export default followUser