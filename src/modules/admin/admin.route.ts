import express from "express";
import { adminLogin, createAdmin } from "./admin.controller";

const adminRouter = express.Router();

// Create admin route
adminRouter.post("/api/v1/admins/create-admin", createAdmin);

// Admin Login route
adminRouter.post("/api/v1/admins/login", adminLogin);

export default adminRouter;
