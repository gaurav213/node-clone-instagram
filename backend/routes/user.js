import express from "express";

import followUser from "../controllers/folloUser.js";
import {register,login, logout, updatePassword, updateprofile, deleteProfile, myProfile, getUserProfile, getAllUser} from "../controllers/user.js"
import isAuthenticated from "../middelware/auth.js";


const router = express.Router();

router.post("/register",register)

router.post("/login",login)
router.get("/logout",logout)
router.get("/follow/:id",isAuthenticated,followUser)
router.put("/update/password", isAuthenticated,updatePassword)
router.put("/update/profile", isAuthenticated,updateprofile)
router.delete("/delete/me", isAuthenticated,deleteProfile)
router.get("/myProfile", isAuthenticated, myProfile)
router.get("/user/:id", isAuthenticated,getUserProfile)
router.get("/users",isAuthenticated,getAllUser)
export default router