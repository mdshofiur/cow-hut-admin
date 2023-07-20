import express from "express";
import {
  createUsers,
  deleteUser,
  getAllUsers,
  getMyProfile,
  getSingleUser,
  loginUser,
  refreshToken,
  updateUser,
} from "./user.controller";
import { adminMiddleware } from "../../middleware/auth-middleware";


const userRouter = express.Router();


// Create a new user
userRouter.post("/api/v1/auth/signup", createUsers);

// Login user route
userRouter.post("/api/v1/auth/login", loginUser);

// Refresh token route
userRouter.post("/api/v1/auth/refresh-token", refreshToken);

// Get all users
userRouter.get("/api/v1/users", adminMiddleware, getAllUsers);

// Get my profile
userRouter.get("/api/v1/users/my-profile", getMyProfile);

// Get a single user by ID
userRouter.get("/api/v1/users/:id", adminMiddleware, getSingleUser);

// Update a user by ID
userRouter.put("/api/v1/users/:id", adminMiddleware, updateUser);

// Delete a user by ID
userRouter.delete("/api/v1/users/:id", adminMiddleware, deleteUser);


export default userRouter;
