import express from "express";
import {getAllOrders, moveCartToOrders} from "../controllers/product.js";

const router = express.Router();


 router.post("/:userId",moveCartToOrders );
 router.get("/:userId",getAllOrders);

export default router;