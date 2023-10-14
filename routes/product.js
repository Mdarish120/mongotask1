import express from "express";
import { createProduct,updateProduct ,deleteProduct,addToCart,deleteCartItem} from "../controllers/project.js";

const router = express.Router();

 router.post("/",createProduct);
 router.put("/",updateProduct);
 router.delete("/:id",deleteProduct);
 router.post("/cart/:userId/:productId",addToCart);
 router.delete("/cart/:userId/:cartItemId",deleteCartItem);
 
export default router;