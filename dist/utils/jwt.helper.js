"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Helper function to generate access token
function generateAccessToken(user) {
    const accessToken = jsonwebtoken_1.default.sign({ _id: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d",
    });
    return accessToken;
}
exports.generateAccessToken = generateAccessToken;
// Helper function to generate refresh token
function generateRefreshToken(user) {
    const refreshToken = jsonwebtoken_1.default.sign({ _id: user._id, role: user.role }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "23d",
    });
    return refreshToken;
}
exports.generateRefreshToken = generateRefreshToken;
//# sourceMappingURL=jwt.helper.js.map