import { UserModel } from "../user/user.model";
import { AdminModel } from "./admin.model";

export const adminCreateService = async (data: any) => {
  const adminCreate = await AdminModel.create(data);
  return adminCreate;
};

export const adminLoginService = async (data: any) => {
  const admin = await AdminModel.findOne({ phoneNumber: data.phoneNumber });
  return admin;
};

