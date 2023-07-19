"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCow = exports.updateCow = exports.getSingleCow = exports.getAllCows = exports.createCow = void 0;
const cow_service_1 = require("./cow.service");
/* -------------------------------------------------------------------------- */
/*                                Create a cow                                */
/* -------------------------------------------------------------------------- */
const createCow = async (req, res) => {
    try {
        const cow = await (0, cow_service_1.createCowService)(req.body);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Cow created successfully",
            data: cow,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Failed to create cow",
            error: error.message,
        });
    }
};
exports.createCow = createCow;
/* -------------------------------------------------------------------------- */
/*                                Get all cows                                */
/* -------------------------------------------------------------------------- */
const getAllCows = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sortBy = req.query.sortBy || "createdAt";
        const sortOrder = req.query.sortOrder || "desc";
        const minPrice = parseInt(req.query.minPrice) || 0;
        const maxPrice = parseInt(req.query.maxPrice) || Infinity;
        const location = req.query.location || "";
        const searchTerm = req.query.searchTerm || "";
        const query = {
            price: { $gte: minPrice, $lte: maxPrice },
            location: { $regex: new RegExp(location, "i") },
            $or: [
                { location: { $regex: new RegExp(searchTerm, "i") } },
                { breed: { $regex: new RegExp(searchTerm, "i") } },
                { category: { $regex: new RegExp(searchTerm, "i") } },
            ],
        };
        const { cows, totalPages } = await (0, cow_service_1.getAllCowsService)(query, sortBy, sortOrder, page, limit);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Failed to retrieve cows",
            error: error.message,
        });
    }
};
exports.getAllCows = getAllCows;
/* -------------------------------------------------------------------------- */
/*                               Get single cow                               */
/* -------------------------------------------------------------------------- */
const getSingleCow = async (req, res) => {
    const { id } = req.params;
    try {
        const cow = await (0, cow_service_1.getSingleCowService)(id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Cow retrieved successfully",
            data: cow,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Failed to fetch cow",
            error: error.message,
        });
    }
};
exports.getSingleCow = getSingleCow;
/* -------------------------------------------------------------------------- */
/*                               Update a cow                                 */
/* -------------------------------------------------------------------------- */
const updateCow = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCow = await (0, cow_service_1.updateCowService)(id, req.body);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Cow updated successfully",
            data: updatedCow,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Failed to update cow",
            error: error.message,
        });
    }
};
exports.updateCow = updateCow;
/* -------------------------------------------------------------------------- */
/*                               Delete a cow                                 */
/* -------------------------------------------------------------------------- */
const deleteCow = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCow = await (0, cow_service_1.deleteCowService)(id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Cow deleted successfully",
            data: deletedCow,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Failed to delete cow",
            error: error.message,
        });
    }
};
exports.deleteCow = deleteCow;
/* -------------------------------------------------------------------------- */
/*                               Create a order                               */
/* -------------------------------------------------------------------------- */
//# sourceMappingURL=cow.controller.js.map