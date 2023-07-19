"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLoginService = exports.adminCreateService = void 0;
const admin_model_1 = require("./admin.model");
const adminCreateService = async (data) => {
    const adminCreate = await admin_model_1.AdminModel.create(data);
    return adminCreate;
};
exports.adminCreateService = adminCreateService;
const adminLoginService = async (data) => {
    const admin = await admin_model_1.AdminModel.findOne({ phoneNumber: data.phoneNumber });
    return admin;
};
exports.adminLoginService = adminLoginService;
//# sourceMappingURL=admin.service.js.map