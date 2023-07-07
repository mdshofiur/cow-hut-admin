import mongoose, { Schema } from "mongoose";
import { IUser, UserRole } from "./user.interfaces";

const userSchema = new Schema<IUser>({
  _id: { type: Schema.Types.ObjectId, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  role: { type: String, enum: Object.values(UserRole), required: true },
  password: { type: String, required: true },
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  address: { type: String, required: true },
  budget: { type: Number, default: 0 },
  income: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model<IUser>("User", userSchema);
