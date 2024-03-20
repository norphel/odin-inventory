import { Router } from "express";
const router = Router();

import {
  item_list,
  item_detail,
  item_create_get,
} from "../controllers/item.controller.js";

router.get("/", item_list);
router.get("/item/create", item_create_get);
router.get("/item/:id", item_detail);

export default router;
