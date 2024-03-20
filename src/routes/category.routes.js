import { Router } from "express";
const router = Router();

import {
  category_list,
  category_create_get,
  category_detail,
  category_create_post,
} from "../controllers/category.controller.js";

router.get("/", category_list);
router.get("/category/create", category_create_get);
router.post("/category/create", category_create_post);
router.get("/category/:id", category_detail);

export default router;
