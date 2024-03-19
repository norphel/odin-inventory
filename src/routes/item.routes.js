import { Router } from "express";
const router = Router();

import { item_list } from "../controllers/item.controller.js";

router.get("/", item_list);

export default router;
