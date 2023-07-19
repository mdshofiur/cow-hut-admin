"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.createOrder = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cow_model_1 = require("../cow/cow.model");
const user_model_1 = require("../user/user.model");
const orders_model_1 = require("./orders.model");
const createOrder = async (req, res) => {
    const { cow, buyer } = req.body;
    const extractObjectId = (value) => {
        const regex = /^ObjectId\((.+)\)$/;
        const match = value.match(regex);
        return match ? match[1] : value;
    };
    // const cowId = extractObjectId(cow);
    const buyerId = extractObjectId(buyer);
    try {
        const buyerObj = await user_model_1.UserModel.findById(new mongoose_1.default.Types.ObjectId(buyerId));
        const cowObj = await cow_model_1.CowModel.findById(new mongoose_1.default.Types.ObjectId(cow));
        if (!buyerObj || !cowObj) {
            return res.status(404).json({
                success: false,
                message: "Buyer or cow not found",
            });
        }
        if (buyerObj.budget < cowObj.price) {
            return res.status(400).json({
                success: false,
                message: "Insufficient funds in the buyer's account",
            });
        }
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        const updatedCow = await cow_model_1.CowModel.findByIdAndUpdate(cow, { status: "sold out" }, { new: true });
        if (!updatedCow) {
            throw new Error("Error updating cow status");
        }
        await user_model_1.UserModel.findByIdAndUpdate(buyer, {
            $inc: { budget: -cowObj.price },
        });
        await user_model_1.UserModel.findByIdAndUpdate(updatedCow.seller, {
            $inc: { income: cowObj.price },
        });
        const newOrder = await orders_model_1.OrderModel.create({ cow, buyer });
        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Order created successfully",
            data: newOrder,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: `An error occurred while processing the order: ${error.message}`,
            data: null,
        });
    }
};
exports.createOrder = createOrder;
const getOrders = async (req, res) => {
    try {
        const orders = await orders_model_1.OrderModel.find().populate("cow").populate("buyer");
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Orders retrieved successfully",
            data: orders,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: `An error occurred while retrieving the orders: ${error.message}`,
            data: null,
        });
    }
};
exports.getOrders = getOrders;
//# sourceMappingURL=order.controller.js.map