"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyProfile = exports.deleteUser = exports.updateUser = exports.getSingleUser = exports.getAllUsers = exports.refreshToken = exports.loginUser = exports.createUsers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = require("./user.service");
const jwt_helper_1 = require("../../utils/jwt.helper");
const user_model_1 = require("./user.model");
const auth_middleware_1 = require("../../middleware/auth-middleware");
/* -------------------------------------------------------------------------- */
/*                                Create a user                               */
/* -------------------------------------------------------------------------- */
const createUsers = async (req, res) => {
    const { password, role, name, phoneNumber, address, budget, income } = req.body;
    try {
        // Check if user with the same phone number already exists
        const existingUser = await user_model_1.UserModel.findOne({ phoneNumber });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Phone number is already taken",
            });
        }
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = {
            _id: new mongoose_1.default.Types.ObjectId(),
            password: hashedPassword,
            role,
            name,
            phoneNumber,
            address,
            budget,
            income,
        };
        const user = await (0, user_service_1.createUsersService)(newUser);
        // Generate JWT token
        const accessToken = (0, jwt_helper_1.generateAccessToken)(user);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User created successfully",
            data: {
                user,
                accessToken,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Failed to create user",
            error: error.message,
        });
    }
};
exports.createUsers = createUsers;
/* -------------------------------------------------------------------------- */
/*                                 Login User                                 */
/* -------------------------------------------------------------------------- */
const loginUser = async (req, res) => {
    const { phoneNumber, password } = req.body;
    try {
        const user = await (0, user_service_1.userLoginService)({ phoneNumber });
        if (!user) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User not found",
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
            message: "User logged in successfully",
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
exports.loginUser = loginUser;
/* -------------------------------------------------------------------------- */
/*                                Refresh token                               */
/* -------------------------------------------------------------------------- */
const refreshToken = async (req, res) => {
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
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res
                    .status(401)
                    .json({ success: false, message: "Invalid refresh token" });
            }
            // Generate a new access token
            const accessToken = (0, jwt_helper_1.generateAccessToken)(decoded);
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
        });
    }
    catch (error) {
        res.status(401).json({
            success: false,
            statusCode: 401,
            message: "Invalid refresh token",
            error: error.message,
        });
    }
};
exports.refreshToken = refreshToken;
/* -------------------------------------------------------------------------- */
/*                                Get all users                               */
/* -------------------------------------------------------------------------- */
const getAllUsers = async (req, res) => {
    try {
        const users = await (0, user_service_1.UsersService)();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Users fetched successfully",
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Failed to fetch users",
            error: error.message,
        });
    }
};
exports.getAllUsers = getAllUsers;
/* -------------------------------------------------------------------------- */
/*                               Get single user                              */
/* -------------------------------------------------------------------------- */
const getSingleUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await (0, user_service_1.UserService)(id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User fetched successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Failed to fetch user",
            error: error.message,
        });
    }
};
exports.getSingleUser = getSingleUser;
/* -------------------------------------------------------------------------- */
/*                                Update a user                               */
/* -------------------------------------------------------------------------- */
const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const userUpdate = await (0, user_service_1.updateUserService)(id, req.body);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User updated successfully",
            data: userUpdate,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Failed to update user",
            error: error.message,
        });
    }
};
exports.updateUser = updateUser;
/* -------------------------------------------------------------------------- */
/*                                Delete a user                               */
/* -------------------------------------------------------------------------- */
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const userDelete = await (0, user_service_1.deleteUserService)(id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User deleted successfully",
            data: userDelete,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Failed to delete user",
            error: error.message,
        });
    }
};
exports.deleteUser = deleteUser;
// getMyProfile from access token
const getMyProfile = async (req, res) => {
    const getToken = req.cookies.accessToken;
    const token = await (0, auth_middleware_1.verifyToken)(getToken);
    if (!token) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: "Access token missing",
        });
    }
    try {
        const user = await user_model_1.UserModel.findById(token._id).select('-_id name phoneNumber address');
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Failed to fetch user",
            error: error.message,
        });
    }
};
exports.getMyProfile = getMyProfile;
//# sourceMappingURL=user.controller.js.map