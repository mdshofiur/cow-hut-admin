"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("../../middleware/auth-middleware");
const userRouter = express_1.default.Router();
// Create a new user
userRouter.post("/api/v1/auth/signup", user_controller_1.createUsers);
// Login user route
userRouter.post("/api/v1/auth/login", user_controller_1.loginUser);
// Refresh token route
userRouter.post("/api/v1/auth/refresh-token", user_controller_1.refreshToken);
// Get all users
userRouter.get("/api/v1/users", auth_middleware_1.adminMiddleware, user_controller_1.getAllUsers);
// Get my profile
userRouter.get("/api/v1/users/my-profile", user_controller_1.getMyProfile);
// Get a single user by ID
userRouter.get("/api/v1/users/:id", auth_middleware_1.adminMiddleware, user_controller_1.getSingleUser);
// Update a user by ID
userRouter.put("/api/v1/users/:id", auth_middleware_1.adminMiddleware, user_controller_1.updateUser);
// Delete a user by ID
userRouter.delete("/api/v1/users/:id", auth_middleware_1.adminMiddleware, user_controller_1.deleteUser);
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map