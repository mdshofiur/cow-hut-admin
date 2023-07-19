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
exports.deleteCowService = exports.updateCowService = exports.getSingleCowService = exports.getAllCowsService = exports.createCowService = void 0;
const cow_model_1 = require("./cow.model");
/* -------------------------------------------------------------------------- */
/*                             Create a cow service                          */
/* -------------------------------------------------------------------------- */
const createCowService = (cowData) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = yield cow_model_1.CowModel.create(cowData);
    return cow;
});
exports.createCowService = createCowService;
/* -------------------------------------------------------------------------- */
/*                            Get all cows service                            */
/* -------------------------------------------------------------------------- */
const getAllCowsService = (query, sortBy, sortOrder, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const [cows, totalCows] = yield Promise.all([
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
});
exports.getAllCowsService = getAllCowsService;
/* -------------------------------------------------------------------------- */
/*                           Get single cow service                           */
/* -------------------------------------------------------------------------- */
const getSingleCowService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = yield cow_model_1.CowModel.findById(id);
    return cow;
});
exports.getSingleCowService = getSingleCowService;
/* -------------------------------------------------------------------------- */
/*                            Update a cow service                            */
/* -------------------------------------------------------------------------- */
const updateCowService = (id, update) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedCow = yield cow_model_1.CowModel.updateOne({ _id: id }, update);
    return updatedCow;
});
exports.updateCowService = updateCowService;
/* -------------------------------------------------------------------------- */
/*                            Delete a cow service                            */
/* -------------------------------------------------------------------------- */
const deleteCowService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCow = yield cow_model_1.CowModel.deleteOne({ _id: id });
    return deletedCow;
});
exports.deleteCowService = deleteCowService;
