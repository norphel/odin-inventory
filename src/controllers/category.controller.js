import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";

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
});

const category_create_get = (req, res, next) => {
  res.render("category_form", {
    title: "Create Category",
  });
};

const category_create_post = [
  body("name", "Category name is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Category description is required")
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      const categoryExists = await Category.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (categoryExists) {
        res.redirect("/categories" + categoryExists.url);
      } else {
        await category.save();
        res.redirect("/categories" + category.url);
      }
    }
  }),
];

const category_delete_get = asyncHandler(async (req, res, next) => {
  const [category, itemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);

  if (category === null) {
    res.redirect("/categories");
  }

  res.render("category_delete", {
    title: "Delete Category",
    category: category,
    itemsInCategory: itemsInCategory,
  });
});

const category_delete_post = asyncHandler(async (req, res, next) => {
  const [category, itemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);

  if (itemsInCategory.length > 0) {
    res.render("category_delete", {
      title: "Delete Category",
      category: category,
      itemsInCategory: itemsInCategory,
    });
    return;
  } else {
    await Category.findByIdAndDelete(req.body.categoryId);
    res.redirect("/categories");
  }
});

const category_update_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();

  if (category === null) {
    const err = new Error("Category NOT found");
    res.status = 404;
    next(err);
  }

  res.render("category_form", {
    title: "Update Category",
    category: category,
  });
});

const category_update_post = [
  body("name", "Category name is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Category description is required")
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Update Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      const categoryExists = await Category.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (categoryExists) {
        res.redirect("/categories" + categoryExists.url);
      } else {
        const updatedCategory = await Category.findByIdAndUpdate(
          req.params.id,
          category,
          {}
        );
        res.redirect("/categories" + updatedCategory.url);
      }
    }
  }),
];

export {
  category_list,
  category_create_get,
  category_detail,
  category_create_post,
  category_delete_get,
  category_delete_post,
  category_update_get,
  category_update_post,
};
