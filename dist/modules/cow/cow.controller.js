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
exports.deleteCow = exports.updateCow = exports.getSingleCow = exports.getAllCows = exports.createCow = void 0;
const cow_service_1 = require("./cow.service");
/* -------------------------------------------------------------------------- */
/*                                Create a cow                                */
/* -------------------------------------------------------------------------- */
const createCow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cow = yield (0, cow_service_1.createCowService)(req.body);
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
});
exports.createCow = createCow;
/* -------------------------------------------------------------------------- */
/*                                Get all cows                                */
/* -------------------------------------------------------------------------- */
const getAllCows = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { cows, totalPages } = yield (0, cow_service_1.getAllCowsService)(query, sortBy, sortOrder, page, limit);
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
});
exports.getAllCows = getAllCows;
/* -------------------------------------------------------------------------- */
/*                               Get single cow                               */
/* -------------------------------------------------------------------------- */
const getSingleCow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cow = yield (0, cow_service_1.getSingleCowService)(id);
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
});
exports.getSingleCow = getSingleCow;
/* -------------------------------------------------------------------------- */
/*                               Update a cow                                 */
/* -------------------------------------------------------------------------- */
const updateCow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updatedCow = yield (0, cow_service_1.updateCowService)(id, req.body);
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
});
exports.updateCow = updateCow;
/* -------------------------------------------------------------------------- */
/*                               Delete a cow                                 */
/* -------------------------------------------------------------------------- */
const deleteCow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedCow = yield (0, cow_service_1.deleteCowService)(id);
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
});
exports.deleteCow = deleteCow;
/* -------------------------------------------------------------------------- */
/*                               Create a order                               */
/* -------------------------------------------------------------------------- */
