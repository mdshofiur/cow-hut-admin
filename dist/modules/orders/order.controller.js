"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.createOrder = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cow_model_1 = require("../cow/cow.model");
const user_model_1 = require("../user/user.model");
const orders_model_1 = require("./orders.model");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cow, buyer } = req.body;
    const extractObjectId = (value) => {
        const regex = /^ObjectId\((.+)\)$/;
        const match = value.match(regex);
        return match ? match[1] : value;
    };
    // const cowId = extractObjectId(cow);
    const buyerId = extractObjectId(buyer);
    try {
        const buyerObj = yield user_model_1.UserModel.findById(new mongoose_1.default.Types.ObjectId(buyerId));
        const cowObj = yield cow_model_1.CowModel.findById(new mongoose_1.default.Types.ObjectId(cow));
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
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        const updatedCow = yield cow_model_1.CowModel.findByIdAndUpdate(cow, { status: "sold out" }, { new: true });
        if (!updatedCow) {
            throw new Error("Error updating cow status");
        }
        yield user_model_1.UserModel.findByIdAndUpdate(buyer, {
            $inc: { budget: -cowObj.price },
        });
        yield user_model_1.UserModel.findByIdAndUpdate(updatedCow.seller, {
            $inc: { income: cowObj.price },
        });
        const newOrder = yield orders_model_1.OrderModel.create({ cow, buyer });
        yield session.commitTransaction();
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
});
exports.createOrder = createOrder;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orders_model_1.OrderModel.find().populate("cow").populate("buyer");
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
});
exports.getOrders = getOrders;
