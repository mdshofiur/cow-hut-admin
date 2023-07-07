import { Request, Response } from "express";
import { adminCreateService, adminLoginService } from "./admin.service";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwt.helper";

// Create admin
export const createAdmin = async (req: Request, res: Response) => {
  const { password, role, name, address, phoneNumber } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = {
      _id: new mongoose.Types.ObjectId(),
      password: hashedPassword,
      role,
      name,
      address,
      phoneNumber,
    };

    const admin = await adminCreateService(newAdmin);
    const { password: _, ...adminData } = admin.toObject();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Admin created successfully",
      data: adminData,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to create admin",
      error: error.message,
    });
  }
};

// Admin Login
export const adminLogin = async (req: Request, res: Response) => {
  const { phoneNumber, password } = req.body;

  try {
    const user = await adminLoginService({ phoneNumber });

    if (!user) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Admin not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Invalid password",
      });
    }

    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);

    // Set the refresh token as a cookie in the response
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Admin logged in successfully",
      data: {
        accessToken: accessToken,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to login admin",
      error: error.message,
    });
  }
};
