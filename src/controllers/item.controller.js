import asyncHandler from "express-async-handler";

import { Item } from "../models/item.model.js";

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

export { item_list, item_detail };
