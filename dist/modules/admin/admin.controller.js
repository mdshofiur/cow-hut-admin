"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, role, name, address, phoneNumber } = req.body;
    try {
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newAdmin = {
            _id: new mongoose_1.default.Types.ObjectId(),
            password: hashedPassword,
            role,
            name,
            address,
            phoneNumber,
        };
        const admin = yield (0, admin_service_1.adminCreateService)(newAdmin);
        const _a = admin.toObject(), { password: _ } = _a, adminData = __rest(_a, ["password"]);
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
});
exports.createAdmin = createAdmin;
// Admin Login
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = req.body;
    try {
        const user = yield (0, admin_service_1.adminLoginService)({ phoneNumber });
        if (!user) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Admin not found",
            });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
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
});
exports.adminLogin = adminLogin;
