import mongoose, { Schema } from "mongoose";

export enum UserRole {
  Seller = "seller",
  Buyer = "buyer",
  Admin = "admin",
}

export interface IAdmin extends Document {
  _id: Schema.Types.ObjectId;
  phoneNumber: string;
  role: "admin";
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  createdAt: Date;
  updatedAt: Date;
}
