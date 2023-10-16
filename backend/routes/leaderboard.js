import express from "express";
import {  getUserAllExpenses} from "../controllers/expense.js";
import auth from "../middleware/auth.js";



const router=express.Router();


router.get("/",auth, getUserAllExpenses);








export default router;