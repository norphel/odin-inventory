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

export { item_list };
