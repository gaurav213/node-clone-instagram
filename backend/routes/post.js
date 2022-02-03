import express from "express";
import likeAndUnlikePost from "../controllers/likeanddislike.js";
import deletePost from "../controllers/deletepost.js"
import createPost from "../controllers/post.js"
import isAuthenticated from "../middelware/auth.js";
import router from "./user.js";
import getPostOfFollowing from "../controllers/postofFollowing.js";
import updateCaption from "../controllers/updateCaption.js";
const route = express.Router();

route.post("/post/upload",isAuthenticated, createPost);
router.get("/post/:id",isAuthenticated,likeAndUnlikePost)
router.put("/post/:id", isAuthenticated, updateCaption)
router.delete("/post/:id",isAuthenticated,deletePost)
router.get("/posts",isAuthenticated,getPostOfFollowing)

export default route