"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = exports.createAdmin = void 0;
const admin_service_1 = require("./admin.service");
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_helper_1 = require("../../utils/jwt.helper");
// Create admin
const createAdmin = async (req, res) => {
    const { password, role, name, address, phoneNumber } = req.body;
    try {
        // Hash the password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newAdmin = {
            _id: new mongoose_1.default.Types.ObjectId(),
            password: hashedPassword,
            role,
            name,
            address,
            phoneNumber,
        };
        const admin = await (0, admin_service_1.adminCreateService)(newAdmin);
        const { password: _, ...adminData } = admin.toObject();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Admin created successfully",
            data: adminData,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Failed to create admin",
            error: error.message,
        });
    }
};
exports.createAdmin = createAdmin;
// Admin Login
const adminLogin = async (req, res) => {
    const { phoneNumber, password } = req.body;
    try {
        const user = await (0, admin_service_1.adminLoginService)({ phoneNumber });
        if (!user) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Admin not found",
            });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Invalid password",
            });
        }
        const accessToken = (0, jwt_helper_1.generateAccessToken)(user);
        const refreshToken = (0, jwt_helper_1.generateRefreshToken)(user);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Failed to login admin",
            error: error.message,
        });
    }
};
exports.adminLogin = adminLogin;
//# sourceMappingURL=admin.controller.js.map