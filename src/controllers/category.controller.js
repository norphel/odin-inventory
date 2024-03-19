import asyncHandler from "express-async-handler";

import { Category } from "../models/category.model.js";

const category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}, "name description")
    .sort({ name: 1 })
    .exec();

  res.render("category_list", {
    title: "Categories",
    categories: allCategories,
  });
});

export { category_list };
