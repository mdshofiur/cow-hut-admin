import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Verify token function
export const verifyToken = (token: any) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err: any, decoded: any) => {
        if (err) {
          reject(err);
        }
        resolve(decoded);
      }
    );
  });
};

// Admin middleware
export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Access token not found",
    });
  }

  try {
    const decoded: any = await verifyToken(accessToken);
    if (decoded.role !== "admin") {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Unauthorized access",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Invalid access token",
    });
  }
};

// Seller middleware
export const sellerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Access token not found",
    });
  }

  try {
    const decoded: any = await verifyToken(accessToken);
    if (decoded.role !== "seller") {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Unauthorized access",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Invalid access token",
    });
  }
};

// Buyer middleware
export const buyerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Access token not found",
    });
  }

  try {
    const decoded: any = await verifyToken(accessToken);
    if (decoded.role !== "buyer") {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Unauthorized access",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Invalid access token",
    });
  }
};

// Admin , Seller and Buyer middleware
export const adminSellerBuyerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Access token not found",
    });
  }

  try {
    const decoded = (await verifyToken(accessToken)) as any;
    const { role } = decoded;

    // Check if the user is a buyer, seller, or admin
    if (role !== "buyer" && role !== "seller" && role !== "admin") {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Unauthorized access",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Invalid access token",
    });
  }
};

// Orders middleware
export const ordersMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Access token not found",
    });
  }

  try {
    const decoded = (await verifyToken(accessToken)) as any;
    const { _id, role } = decoded;

    // Check if the user is an admin
    if (role === "admin") {
      return next();
    }

    // Check if the user is a buyer or seller
    if (role === "buyer") {
      // Retrieve the order ID from the request parameters
      const orderId = req.params.id;

      // Check if the order's buyer ID matches the user's ID
      if (orderId && orderId === _id) {
        return next();
      }
    }

    if (role === "seller") {
      // Retrieve the order ID from the request parameters
      const orderId = req.params.id;

      // Check if the order's seller ID matches the user's ID
      if (orderId && orderId === _id) {
        return next();
      }
    }

    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Unauthorized access",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Invalid access token",
    });
  }
};

