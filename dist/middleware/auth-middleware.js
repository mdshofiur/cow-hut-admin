"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersMiddleware = exports.adminSellerBuyerMiddleware = exports.buyerMiddleware = exports.sellerMiddleware = exports.adminMiddleware = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Verify token function
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    });
};
exports.verifyToken = verifyToken;
// Admin middleware
const adminMiddleware = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: "Access token not found",
        });
    }
    try {
        const decoded = await (0, exports.verifyToken)(accessToken);
        if (decoded.role !== "admin") {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Unauthorized access",
            });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: "Invalid access token",
        });
    }
};
exports.adminMiddleware = adminMiddleware;
// Seller middleware
const sellerMiddleware = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: "Access token not found",
        });
    }
    try {
        const decoded = await (0, exports.verifyToken)(accessToken);
        if (decoded.role !== "seller") {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Unauthorized access",
            });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: "Invalid access token",
        });
    }
};
exports.sellerMiddleware = sellerMiddleware;
// Buyer middleware
const buyerMiddleware = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: "Access token not found",
        });
    }
    try {
        const decoded = await (0, exports.verifyToken)(accessToken);
        if (decoded.role !== "buyer") {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Unauthorized access",
            });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: "Invalid access token",
        });
    }
};
exports.buyerMiddleware = buyerMiddleware;
// Admin , Seller and Buyer middleware
const adminSellerBuyerMiddleware = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: "Access token not found",
        });
    }
    try {
        const decoded = (await (0, exports.verifyToken)(accessToken));
        const { role } = decoded;
        // Check if the user is a buyer, seller, or admin
        if (role !== "buyer" && role !== "seller" && role !== "admin") {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Unauthorized access",
            });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: "Invalid access token",
        });
    }
};
exports.adminSellerBuyerMiddleware = adminSellerBuyerMiddleware;
// Orders middleware
const ordersMiddleware = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: "Access token not found",
        });
    }
    try {
        const decoded = (await (0, exports.verifyToken)(accessToken));
        const { _id, role } = decoded;
        // Check if the user is an admin
        if (role === "admin") {
            return next();
        }
        // Check if the user is a buyer or seller
        if (role === "buyer") {
            // Retrieve the order ID from the request parameters
            const orderId = req.params.id;
            // Check if the order's buyer ID matches the user's ID
            if (orderId && orderId === _id) {
                return next();
            }
        }
        if (role === "seller") {
            // Retrieve the order ID from the request parameters
            const orderId = req.params.id;
            // Check if the order's seller ID matches the user's ID
            if (orderId && orderId === _id) {
                return next();
            }
        }
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: "Unauthorized access",
        });
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: "Invalid access token",
        });
    }
};
exports.ordersMiddleware = ordersMiddleware;
//# sourceMappingURL=auth-middleware.js.map