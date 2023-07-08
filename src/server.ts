import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRouter from "./modules/user/user.route";
import cowRouters from "./modules/cow/cow.route";
import ordersRouters from "./modules/orders/order.route";
import adminRouter from "./modules/admin/admin.route";

const port: number = 2000;
const uri: any = process.env.DB_URL || "mongodb://localhost:27017/firstdb";

const app: Express = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(userRouter);
app.use(cowRouters);
app.use(ordersRouters);
app.use(adminRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  try {
    await mongoose.connect(uri);
    console.log("Database is connected");
    console.log(`Example app listening on port ${port}`);
  } catch (error) {
    console.log("Database connect error", error);
  }
});
