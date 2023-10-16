import express from "express";
import { addExpense, getExpense ,deleteExpense,editExpense,getReportByDay,getReportByMonth} from "../controllers/expense.js";
import auth from "../middleware/auth.js";



const router=express.Router();


router.post("/:id",auth,addExpense);
router.get("/:id",auth,getExpense);
router.get("/search/day/:id",auth,getReportByDay);
router.get("/search/month/:id",auth,getReportByMonth);
router.put("/:id",auth,editExpense);
router.delete("/:id",auth,deleteExpense);






export default router;