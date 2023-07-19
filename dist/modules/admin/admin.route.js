"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const adminRouter = express_1.default.Router();
// Create admin route
adminRouter.post("/api/v1/admins/create-admin", admin_controller_1.createAdmin);
// Admin Login route
adminRouter.post("/api/v1/admins/login", admin_controller_1.adminLogin);
exports.default = adminRouter;
//# sourceMappingURL=admin.route.js.map