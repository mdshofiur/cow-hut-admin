import mongoose from "mongoose";
import app from "./app";
import express, { Express, NextFunction, Request, Response } from "express";
import userRouter from "./modules/user/user.route";
import cowRouters from "./modules/cow/cow.route";
import ordersRouters from "./modules/orders/order.route";
import adminRouter from "./modules/admin/admin.route";

const port: number = 2000;

export default async function main() {
  const uri: any = process.env.DB_URL || "mongodb://localhost:27017/firstdb";
  try {
    (await mongoose.connect(uri)) as any;
    console.log("Database is connected");
    // app listen
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log("Database connect error", error);
  }
}

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World!");
});

app.use(userRouter);
app.use(cowRouters);
app.use(ordersRouters);
app.use(adminRouter);


main();
