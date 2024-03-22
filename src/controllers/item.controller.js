import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";

import { Item } from "../models/item.model.js";
import { Category } from "../models/category.model.js";

const item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({})
    .sort({ name: 1 })
    .populate("category")
    .exec();

  res.render("item_list", {
    title: "Items",
    items: allItems,
  });
});

const item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("category").exec();

  if (item === null) {
    const err = new Error("Item not found");
    err.status = 404;
    next(err);
  }

  res.render("item_detail", {
    title: item.name,
    item: item,
  });
});

const item_create_get = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}, "name")
    .sort({ name: 1 })
    .exec();

  res.render("item_form", {
    title: "Create Item",
    allCategories: allCategories,
  });
});

const item_create_post = [
  body("name", "Item name is required").trim().isLength({ min: 1 }).escape(),
  body("description", "Item description is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category").escape(),
  body("price").isNumeric().escape(),
  body("numberInStock", "Quantity in Stock should be an integer")
    .isInt()
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      numberInStock: req.body.numberInStock,
    });

    if (!errors.isEmpty()) {
      const allCategories = await Category.find({}, "name").sort({ name: 1 });

      res.render("item_form", {
        title: "Create Item",
        allCategories: allCategories,
        selected_category: item.category._id,
        item: item,
      });
      return;
    } else {
      await item.save();
      res.redirect("/items" + item.url);
    }
  }),
];

const item_delete_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("category").exec();

  if (item === null) {
    res.redirect("/items");
  }

  res.render("item_delete", {
    title: "Delete Item",
    item: item,
  });
});

const item_delete_post = asyncHandler(async (req, res, next) => {
  await Item.findByIdAndDelete(req.params.id);
  res.redirect("/items");
});

const item_update_get = asyncHandler(async (req, res, next) => {
  const [item, allCategories] = await Promise.all([
    Item.findById(req.params.id).populate("category").exec(),
    Category.find({}, "name").sort({ name: 1 }).exec(),
  ]);

  if (item === null) {
    const err = new Error("Item not found");
    err.status = 404;
    next(err);
  }

  res.render("item_form", {
    title: "Update Item",
    item: item,
    allCategories: allCategories,
    selected_category: item.category._id,
  });
});

const item_update_post = [
  body("name", "Item name is required").trim().isLength({ min: 1 }).escape(),
  body("description", "Item description is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category").escape(),
  body("price").isNumeric().escape(),
  body("numberInStock", "Quantity in Stock should be an integer")
    .isInt()
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      numberInStock: req.body.numberInStock,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const allCategories = await Category.find({}, "name").sort({ name: 1 });

      res.render("item_form", {
        title: "Create Item",
        allCategories: allCategories,
        selected_category: item.category._id,
        item: item,
      });
      return;
    } else {
      const updatedItem = await Item.findByIdAndUpdate(req.params.id, item, {});
      res.redirect("/items" + updatedItem.url);
    }
  }),
];

export {
  item_list,
  item_detail,
  item_create_get,
  item_create_post,
  item_delete_get,
  item_delete_post,
  item_update_get,
  item_update_post,
};
