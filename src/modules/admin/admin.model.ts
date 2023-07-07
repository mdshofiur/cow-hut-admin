import mongoose, { Schema } from "mongoose";
import { IAdmin } from "./admin.interfaces";

const adminSchema = new Schema<IAdmin>({
  _id: { type: Schema.Types.ObjectId, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  role: { type: String, enum: ["admin"], required: true },
  password: { type: String, required: true },
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create the Admin model
export const AdminModel = mongoose.model<IAdmin>("Admin", adminSchema);
