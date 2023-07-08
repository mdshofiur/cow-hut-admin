// import express, { Express, NextFunction, Request, Response } from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import "dotenv/config";
// import { errorHandlerMiddleware } from "./middleware/error-handler";
// import userRouter from "./modules/user/user.route";
// import cowRouters from "./modules/cow/cow.route";
// import ordersRouters from "./modules/orders/order.route";
// import adminRouter from "./modules/admin/admin.route";

// const app: Express = express();
// require("dotenv").config();

// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(errorHandlerMiddleware);
// app.use(cookieParser());

// app.use(userRouter);
// app.use(cowRouters);
// app.use(ordersRouters);
// app.use(adminRouter);

// app.get("/", (req: Request, res: Response, next: NextFunction) => {
//   res.send("Hello World!");
// });

// export default app;
