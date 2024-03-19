import { Router } from "express";
const router = Router();

import { category_list } from "../controllers/category.controller.js";

router.get("/", category_list);

export default router;
