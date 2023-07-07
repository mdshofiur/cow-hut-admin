import mongoose from "mongoose";
import { Request, Response } from "express";
import { CowModel } from "../cow/cow.model";
import { UserModel } from "../user/user.model";
import { OrderModel } from "./orders.model";

export const createOrder = async (req: Request, res: Response) => {
  const { cow, buyer } = req.body;

  const extractObjectId = (value: any) => {
    const regex = /^ObjectId\((.+)\)$/;
    const match = value.match(regex);
    return match ? match[1] : value;
  };

  // const cowId = extractObjectId(cow);
  const buyerId = extractObjectId(buyer);

  try {
    const buyerObj = await UserModel.findById(
      new mongoose.Types.ObjectId(buyerId)
    );

    const cowObj = await CowModel.findById(new mongoose.Types.ObjectId(cow));

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

    const session = await mongoose.startSession();
    session.startTransaction();

    const updatedCow = await CowModel.findByIdAndUpdate(
      cow,
      { status: "sold out" },
      { new: true }
    );

    if (!updatedCow) {
      throw new Error("Error updating cow status");
    }

    await UserModel.findByIdAndUpdate(buyer, {
      $inc: { budget: -cowObj.price },
    });
    await UserModel.findByIdAndUpdate(updatedCow.seller, {
      $inc: { income: cowObj.price },
    });

    const newOrder = await OrderModel.create({ cow, buyer });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: `An error occurred while processing the order: ${error.message}`,
      data: null,
    });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find().populate("cow").populate("buyer");
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: `An error occurred while retrieving the orders: ${error.message}`,
      data: null,
    });
  }
};
