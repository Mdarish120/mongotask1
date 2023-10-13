import express from "express";
import { createProduct,updateProduct ,deleteProduct,addToCart} from "../controllers/project.js";

const router = express.Router();

 router.post("/",createProduct);
 router.put("/",updateProduct);
 router.delete("/:id",deleteProduct);
 router.post("/cart/:userId/:productId",addToCart);
export default router;