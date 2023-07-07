import mongoose from "mongoose";

interface Order {
  cow: mongoose.Types.ObjectId;
  buyer: mongoose.Types.ObjectId;
}

const orderSchema = new mongoose.Schema<Order>({
  cow: { type: mongoose.Schema.Types.ObjectId, required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, required: true },
});

export const OrderModel = mongoose.model<Order>("Order", orderSchema);
