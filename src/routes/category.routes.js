import { Router } from "express";
const router = Router();

import {
  category_list,
  // category_detail,
  category_create_get,
} from "../controllers/category.controller.js";

router.get("/", category_list);
// router.get("/category/:id", category_detail);
router.get("/category/create", category_create_get);

export default router;
