import express from "express";
import { createProduct } from "../controllers/project.js";

const router = express.Router();

 router.post("/",createProduct);
export default router;