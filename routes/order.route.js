import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getOrders, intent, confirm, refund } from "../controllers/order.controller.js";

const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
router.get("/", getOrders);
router.post("/create-payment-intent/:id", intent);
router.put("/", confirm);

// Add route for refunds
router.post("/refund/:id", refund);

export default router;