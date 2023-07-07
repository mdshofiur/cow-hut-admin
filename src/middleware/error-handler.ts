import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;

  let message = "Internal Server Error";

  let errorMessages: Array<{ path: string; message: string | any }> = [];

  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400; // Bad Request
    message = "Validation Error";
    errorMessages = Object.values(err.errors).map((error) => ({
      path: error.path,
      message: error.message,
    }));
  } else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400; // Bad Request
    message = "Cast Error";
    errorMessages = [{ path: err.path, message: "Invalid value" }];
  } else if (err.code === 11000) {
    statusCode = 400; // Bad Request
    message = "Duplicate Entry";
    errorMessages = [{ path: "", message: err.message }];
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: err.stack || "",
  });
};
