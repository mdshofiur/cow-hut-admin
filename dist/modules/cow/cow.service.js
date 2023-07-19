"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCowService = exports.updateCowService = exports.getSingleCowService = exports.getAllCowsService = exports.createCowService = void 0;
const cow_model_1 = require("./cow.model");
/* -------------------------------------------------------------------------- */
/*                             Create a cow service                          */
/* -------------------------------------------------------------------------- */
const createCowService = async (cowData) => {
    const cow = await cow_model_1.CowModel.create(cowData);
    return cow;
};
exports.createCowService = createCowService;
/* -------------------------------------------------------------------------- */
/*                            Get all cows service                            */
/* -------------------------------------------------------------------------- */
const getAllCowsService = async (query, sortBy, sortOrder, page, limit) => {
    const [cows, totalCows] = await Promise.all([
        cow_model_1.CowModel.find(query)
            .sort({ [sortBy]: sortOrder })
            .skip((page - 1) * limit)
            .limit(limit),
        cow_model_1.CowModel.countDocuments(query),
    ]);
    const totalPages = Math.ceil(totalCows / limit);
    return {
        cows,
        totalPages,
    };
};
exports.getAllCowsService = getAllCowsService;
/* -------------------------------------------------------------------------- */
/*                           Get single cow service                           */
/* -------------------------------------------------------------------------- */
const getSingleCowService = async (id) => {
    const cow = await cow_model_1.CowModel.findById(id);
    return cow;
};
exports.getSingleCowService = getSingleCowService;
/* -------------------------------------------------------------------------- */
/*                            Update a cow service                            */
/* -------------------------------------------------------------------------- */
const updateCowService = async (id, update) => {
    const updatedCow = await cow_model_1.CowModel.updateOne({ _id: id }, update);
    return updatedCow;
};
exports.updateCowService = updateCowService;
/* -------------------------------------------------------------------------- */
/*                            Delete a cow service                            */
/* -------------------------------------------------------------------------- */
const deleteCowService = async (id) => {
    const deletedCow = await cow_model_1.CowModel.deleteOne({ _id: id });
    return deletedCow;
};
exports.deleteCowService = deleteCowService;
//# sourceMappingURL=cow.service.js.map