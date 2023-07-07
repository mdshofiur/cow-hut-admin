import express from "express";
import {
  createCow,
  deleteCow,
  getAllCows,
  getSingleCow,
  updateCow,
} from "./cow.controller";
import {
  sellerMiddleware,
  adminSellerBuyerMiddleware,
} from "../../middleware/auth-middleware";

const cowRouters = express.Router();

// Create a new cow (only seller can create)
cowRouters.post("/api/v1/cows", sellerMiddleware, createCow);

// Get all cows (only admin, seller and buyer can get)
cowRouters.get("/api/v1/cows", adminSellerBuyerMiddleware, getAllCows);

// Get a single cow by ID (only admin, seller and buyer can get)
cowRouters.get("/api/v1/cows/:id", adminSellerBuyerMiddleware, getSingleCow);

// Update a cow by ID (only seller can update)
cowRouters.put("/api/v1/cows/:id", sellerMiddleware, updateCow);

// Delete a cow by ID (only seller can delete)
cowRouters.delete("/api/v1/cows/:id", sellerMiddleware, deleteCow);

export default cowRouters;
