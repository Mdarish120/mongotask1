import express from "express";
import { signup,login,forgetPassword ,resetPassword} from "../controllers/auth.js";
import auth from "../middleware/auth.js";


const router=express.Router();


router.post("/signup",signup);
router.post("/login",login);
router.post("/forget-password",forgetPassword);
router.put("/reset-password/:resetToken",resetPassword);


export default router;