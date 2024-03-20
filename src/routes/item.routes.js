import { Router } from "express";
const router = Router();

import { item_list, item_detail } from "../controllers/item.controller.js";

router.get("/", item_list);
router.get("/item/:id", item_detail);

export default router;
