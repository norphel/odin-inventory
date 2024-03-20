import { Router } from "express";
const router = Router();

import {
  category_list,
  category_create_get,
  category_detail,
} from "../controllers/category.controller.js";

router.get("/", category_list);
router.get("/category/create", category_create_get);
router.get("/category/:id", category_detail);

export default router;
