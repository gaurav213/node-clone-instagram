import mongoose from "mongoose";
const postschema = new mongoose.Schema({

    caption: String,
    image: {
        public_id: String,
        url: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            comment: {
                type: String,
                required: true,
            }

        }]


});
let model = mongoose.model("Post", postschema)
export default model