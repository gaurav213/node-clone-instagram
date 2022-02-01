import express from "express";
import likeAndUnlikePost from "../controllers/likeanddislike.js";
import deletePost from "../controllers/deletepost.js"
import createPost from "../controllers/post.js"
import isAuthenticated from "../middelware/auth.js";
import router from "./user.js";
const route = express.Router();

route.post("/post/upload",isAuthenticated, createPost);
router.get("/post/:id",isAuthenticated,likeAndUnlikePost)
router.delete("/post/:id",isAuthenticated,deletePost)

export default route