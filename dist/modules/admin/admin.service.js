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
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLoginService = exports.adminCreateService = void 0;
const admin_model_1 = require("./admin.model");
const adminCreateService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const adminCreate = yield admin_model_1.AdminModel.create(data);
    return adminCreate;
});
exports.adminCreateService = adminCreateService;
const adminLoginService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield admin_model_1.AdminModel.findOne({ phoneNumber: data.phoneNumber });
    return admin;
});
exports.adminLoginService = adminLoginService;
