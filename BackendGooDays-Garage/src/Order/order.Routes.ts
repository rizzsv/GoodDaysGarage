import { Router } from "express";
import { createOrder, getUserOrders, updateOrderStatus } from "./order.controller";

const router = Router();

// create a new order
router.post("/orders", createOrder);

// get user orders
router.get("/orders/:user_id", getUserOrders);

// update order status
router.put("/orders/:id", updateOrderStatus);

export default router;

