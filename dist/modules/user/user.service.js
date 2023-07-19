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
exports.deleteUserService = exports.updateUserService = exports.UserService = exports.UsersService = exports.userLoginService = exports.createUsersService = void 0;
const user_model_1 = require("./user.model");
/* -------------------------------------------------------------------------- */
/*                            Create a user service                           */
/* -------------------------------------------------------------------------- */
const createUsersService = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.create(newUser);
    return user;
});
exports.createUsersService = createUsersService;
/* -------------------------------------------------------------------------- */
/*                             User Log in service                            */
/* -------------------------------------------------------------------------- */
const userLoginService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield user_model_1.UserModel.findOne({ phoneNumber: data.phoneNumber });
    return admin;
});
exports.userLoginService = userLoginService;
/* -------------------------------------------------------------------------- */
/*                            Get all users service                           */
/* -------------------------------------------------------------------------- */
const UsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.UserModel.find();
    return users;
});
exports.UsersService = UsersService;
/* -------------------------------------------------------------------------- */
/*                           Get single user service                          */
/* -------------------------------------------------------------------------- */
const UserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findById(id);
    return user;
});
exports.UserService = UserService;
/* -------------------------------------------------------------------------- */
/*                            Update a user service                           */
/* -------------------------------------------------------------------------- */
const updateUserService = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const updateUser = yield user_model_1.UserModel.updateOne({ _id: userId }, data);
    return updateUser;
});
exports.updateUserService = updateUserService;
/* -------------------------------------------------------------------------- */
/*                             Delete user service                            */
/* -------------------------------------------------------------------------- */
const deleteUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userDelete = yield user_model_1.UserModel.deleteOne({ _id: userId });
    return userDelete;
});
exports.deleteUserService = deleteUserService;
