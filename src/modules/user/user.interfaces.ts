import { Schema } from "mongoose";

export enum UserRole {
  Seller = "seller",
  Buyer = "buyer",
}

export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  phoneNumber: string;
  role: UserRole;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget: number;
  income: number;
  createdAt: Date;
  updatedAt: Date;
}
