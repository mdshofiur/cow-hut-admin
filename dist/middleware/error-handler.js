"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandlerMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = "Internal Server Error";
    let errorMessages = [];
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        statusCode = 400; // Bad Request
        message = "Validation Error";
        errorMessages = Object.values(err.errors).map((error) => ({
            path: error.path,
            message: error.message,
        }));
    }
    else if (err instanceof mongoose_1.default.Error.CastError) {
        statusCode = 400; // Bad Request
        message = "Cast Error";
        errorMessages = [{ path: err.path, message: "Invalid value" }];
    }
    else if (err.code === 11000) {
        statusCode = 400; // Bad Request
        message = "Duplicate Entry";
        errorMessages = [{ path: "", message: err.message }];
    }
    // Send error response
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: err.stack || "",
    });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
