import express from "express";
import { createPayment } from "../controllers/payment.js";
import auth from "../middleware/auth.js";



const router=express.Router();




router.post("/:userId",auth,createPayment);






export default router;