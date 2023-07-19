"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_middleware_1 = require("../../middleware/auth-middleware");
const ordersRouters = express_1.default.Router();
// Create a new cow
ordersRouters.post("/api/v1/orders", auth_middleware_1.buyerMiddleware, order_controller_1.createOrder);
ordersRouters.get("/api/v1/orders", order_controller_1.getOrders);
exports.default = ordersRouters;
//# sourceMappingURL=order.route.js.map