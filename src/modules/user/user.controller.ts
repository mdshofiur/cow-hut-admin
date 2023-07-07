import mongoose from "mongoose";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUsersService,
  deleteUserService,
  updateUserService,
  userLoginService,
  UserService,
  UsersService,
} from "./user.service";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwt.helper";
import { UserModel } from "./user.model";
import { verifyToken } from "../../middleware/auth-middleware";

/* -------------------------------------------------------------------------- */
/*                                Create a user                               */
/* -------------------------------------------------------------------------- */
export const createUsers = async (req: Request, res: Response) => {
  const { password, role, name, phoneNumber, address, budget, income } =
    req.body;

  try {
    // Check if user with the same phone number already exists
    const existingUser = await UserModel.findOne({ phoneNumber });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Phone number is already taken",
      });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      _id: new mongoose.Types.ObjectId(),
      password: hashedPassword,
      role,
      name,
      phoneNumber,
      address,
      budget,
      income,
    };

    const user = await createUsersService(newUser);

    // Generate JWT token
    const accessToken = generateAccessToken(user);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User created successfully",
      data: {
        user,
        accessToken,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to create user",
      error: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                 Login User                                 */
/* -------------------------------------------------------------------------- */
export const loginUser = async (req: Request, res: Response) => {
  const { phoneNumber, password } = req.body;

  try {
    const user = await userLoginService({ phoneNumber });

    if (!user) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "User not found",
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
      message: "User logged in successfully",
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

/* -------------------------------------------------------------------------- */
/*                                Refresh token                               */
/* -------------------------------------------------------------------------- */
export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Refresh token not found",
    });
    return;
  }

  try {
    // Verify the refresh token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
      (err: any, decoded: any) => {
        if (err) {
          return res
            .status(401)
            .json({ success: false, message: "Invalid refresh token" });
        }

        // Generate a new access token
        const accessToken = generateAccessToken(decoded);
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
        });

        res.status(200).json({
          success: true,
          statusCode: 200,
          message: "New access token generated successfully!",
          data: {
            accessToken,
          },
        });
      }
    );
  } catch (error: any) {
    res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Invalid refresh token",
      error: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                Get all users                               */
/* -------------------------------------------------------------------------- */

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UsersService();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                               Get single user                              */
/* -------------------------------------------------------------------------- */

export const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await UserService(id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                Update a user                               */
/* -------------------------------------------------------------------------- */

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userUpdate = await updateUserService(id, req.body);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User updated successfully",
      data: userUpdate,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to update user",
      error: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                Delete a user                               */
/* -------------------------------------------------------------------------- */

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userDelete = await deleteUserService(id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User deleted successfully",
      data: userDelete,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};

// getMyProfile from access token
export const getMyProfile = async (req: Request, res: Response) => {
  const getToken = req.cookies.accessToken;
  const token: any = await verifyToken(getToken);
  if (!token) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Access token missing",
    });
  }
  try {
    const user = await UserModel.findById(token._id).select('-_id name phoneNumber address');
    if (!user) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User's information retrieved successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};
