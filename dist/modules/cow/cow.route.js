"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cow_controller_1 = require("./cow.controller");
const auth_middleware_1 = require("../../middleware/auth-middleware");
const cowRouters = express_1.default.Router();
// Create a new cow (only seller can create)
cowRouters.post("/api/v1/cows", auth_middleware_1.sellerMiddleware, cow_controller_1.createCow);
// Get all cows (only admin, seller and buyer can get)
cowRouters.get("/api/v1/cows", auth_middleware_1.adminSellerBuyerMiddleware, cow_controller_1.getAllCows);
// Get a single cow by ID (only admin, seller and buyer can get)
cowRouters.get("/api/v1/cows/:id", auth_middleware_1.adminSellerBuyerMiddleware, cow_controller_1.getSingleCow);
// Update a cow by ID (only seller can update)
cowRouters.put("/api/v1/cows/:id", auth_middleware_1.sellerMiddleware, cow_controller_1.updateCow);
// Delete a cow by ID (only seller can delete)
cowRouters.delete("/api/v1/cows/:id", auth_middleware_1.sellerMiddleware, cow_controller_1.deleteCow);
exports.default = cowRouters;
//# sourceMappingURL=cow.route.js.map