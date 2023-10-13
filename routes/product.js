import express from "express";
import { createProduct,updateProduct ,deleteProduct} from "../controllers/project.js";

const router = express.Router();

 router.post("/",createProduct);
 router.put("/",updateProduct);
 router.delete("/:id",deleteProduct);
export default router;