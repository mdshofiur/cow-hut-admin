import express from "express";
import { createOrder, getOrders } from "./order.controller";
import { buyerMiddleware } from "../../middleware/auth-middleware";

const ordersRouters = express.Router();

// Create a new cow
ordersRouters.post("/api/v1/orders", buyerMiddleware, createOrder);

ordersRouters.get("/api/v1/orders", getOrders);

export default ordersRouters;
