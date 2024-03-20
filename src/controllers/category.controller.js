import asyncHandler from "express-async-handler";

import { Category } from "../models/category.model.js";
import { Item } from "../models/item.model.js";

const category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}, "name description")
    .sort({ name: 1 })
    .exec();

  res.render("category_list", {
    title: "Categories",
    categories: allCategories,
  });
});
/*
const category_detail = asyncHandler(async (req, res, next) => {
  const [category, allItems] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);

  if (category === null) {
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.render("category_detail", {
    title: category.name,
    category: category,
    allItems: allItems,
  });
});*/

const category_create_get = (req, res, next) => {
  res.render("category_form", {
    title: "Create Category",
  });
};

export {
  category_list,
  // category_detail,
  category_create_get,
};
