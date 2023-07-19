"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    cow: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
    buyer: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
});
exports.OrderModel = mongoose_1.default.model("Order", orderSchema);
//# sourceMappingURL=orders.model.js.map