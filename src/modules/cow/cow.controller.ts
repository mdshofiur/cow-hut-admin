import { Request, Response } from "express";
import {
  createCowService,
  deleteCowService,
  getAllCowsService,
  getSingleCowService,
  updateCowService,
} from "./cow.service";

/* -------------------------------------------------------------------------- */
/*                                Create a cow                                */
/* -------------------------------------------------------------------------- */
export const createCow = async (req: Request, res: Response) => {
 
  try {
    const cow = await createCowService(req.body);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Cow created successfully",
      data: cow,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to create cow",
      error: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                Get all cows                                */
/* -------------------------------------------------------------------------- */

export const getAllCows = async (req: Request, res: Response) => {
  type SortOrder = "asc" | "desc";
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sortOrder = (req.query.sortOrder as SortOrder) || "desc";
    const minPrice = parseInt(req.query.minPrice as string) || 0;
    const maxPrice = parseInt(req.query.maxPrice as string) || Infinity;
    const location = (req.query.location as string) || "";
    const searchTerm = (req.query.searchTerm as string) || "";

    const query: any = {
      price: { $gte: minPrice, $lte: maxPrice },
      location: { $regex: new RegExp(location, "i") },
      $or: [
        { location: { $regex: new RegExp(searchTerm, "i") } },
        { breed: { $regex: new RegExp(searchTerm, "i") } },
        { category: { $regex: new RegExp(searchTerm, "i") } },
      ],
    };

    const { cows, totalPages } = await getAllCowsService(
      query,
      sortBy,
      sortOrder,
      page,
      limit
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Cows retrieved successfully",
      meta: {
        page,
        limit,
        totalPages: totalPages.toString(),
      },
      data: cows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to retrieve cows",
      error: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                               Get single cow                               */
/* -------------------------------------------------------------------------- */

export const getSingleCow = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cow = await getSingleCowService(id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Cow retrieved successfully",
      data: cow,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to fetch cow",
      error: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                               Update a cow                                 */
/* -------------------------------------------------------------------------- */

export const updateCow = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedCow = await updateCowService(id, req.body);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Cow updated successfully",
      data: updatedCow,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to update cow",
      error: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                               Delete a cow                                 */
/* -------------------------------------------------------------------------- */

export const deleteCow = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedCow = await deleteCowService(id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Cow deleted successfully",
      data: deletedCow,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to delete cow",
      error: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                               Create a order                               */
/* -------------------------------------------------------------------------- */
