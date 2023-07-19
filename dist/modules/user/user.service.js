"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserService = exports.updateUserService = exports.UserService = exports.UsersService = exports.userLoginService = exports.createUsersService = void 0;
const user_model_1 = require("./user.model");
/* -------------------------------------------------------------------------- */
/*                            Create a user service                           */
/* -------------------------------------------------------------------------- */
const createUsersService = async (newUser) => {
    const user = await user_model_1.UserModel.create(newUser);
    return user;
};
exports.createUsersService = createUsersService;
/* -------------------------------------------------------------------------- */
/*                             User Log in service                            */
/* -------------------------------------------------------------------------- */
const userLoginService = async (data) => {
    const admin = await user_model_1.UserModel.findOne({ phoneNumber: data.phoneNumber });
    return admin;
};
exports.userLoginService = userLoginService;
/* -------------------------------------------------------------------------- */
/*                            Get all users service                           */
/* -------------------------------------------------------------------------- */
const UsersService = async () => {
    const users = await user_model_1.UserModel.find();
    return users;
};
exports.UsersService = UsersService;
/* -------------------------------------------------------------------------- */
/*                           Get single user service                          */
/* -------------------------------------------------------------------------- */
const UserService = async (id) => {
    const user = await user_model_1.UserModel.findById(id);
    return user;
};
exports.UserService = UserService;
/* -------------------------------------------------------------------------- */
/*                            Update a user service                           */
/* -------------------------------------------------------------------------- */
const updateUserService = async (userId, data) => {
    const updateUser = await user_model_1.UserModel.updateOne({ _id: userId }, data);
    return updateUser;
};
exports.updateUserService = updateUserService;
/* -------------------------------------------------------------------------- */
/*                             Delete user service                            */
/* -------------------------------------------------------------------------- */
const deleteUserService = async (userId) => {
    const userDelete = await user_model_1.UserModel.deleteOne({ _id: userId });
    return userDelete;
};
exports.deleteUserService = deleteUserService;
//# sourceMappingURL=user.service.js.map