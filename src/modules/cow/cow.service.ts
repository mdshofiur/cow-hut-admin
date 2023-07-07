import { CowModel } from "./cow.model";

/* -------------------------------------------------------------------------- */
/*                             Create a cow service                          */
/* -------------------------------------------------------------------------- */
export const createCowService = async (cowData) => {
  const cow = await CowModel.create(cowData);
  return cow;
};

/* -------------------------------------------------------------------------- */
/*                            Get all cows service                            */
/* -------------------------------------------------------------------------- */

export const getAllCowsService = async (
  query: any,
  sortBy: "createdAt" | "price" | "location" | string,
  sortOrder: "asc" | "desc",
  page: number,
  limit: number
) => {
  const [cows, totalCows] = await Promise.all([
    CowModel.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit),
    CowModel.countDocuments(query),
  ]);

  const totalPages = Math.ceil(totalCows / limit);

  return {
    cows,
    totalPages,
  };
};

/* -------------------------------------------------------------------------- */
/*                           Get single cow service                           */
/* -------------------------------------------------------------------------- */
export const getSingleCowService = async (id) => {
  const cow = await CowModel.findById(id);
  return cow;
};

/* -------------------------------------------------------------------------- */
/*                            Update a cow service                            */
/* -------------------------------------------------------------------------- */
export const updateCowService = async (id, update) => {
  const updatedCow = await CowModel.updateOne({ _id: id }, update);
  return updatedCow;
};

/* -------------------------------------------------------------------------- */
/*                            Delete a cow service                            */
/* -------------------------------------------------------------------------- */
export const deleteCowService = async (id) => {
  const deletedCow = await CowModel.deleteOne({ _id: id });
  return deletedCow;
};
