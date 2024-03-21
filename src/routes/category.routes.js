import { Router } from "express";
const router = Router();

import {
  category_list,
  category_create_get,
  category_detail,
  category_create_post,
  category_delete_get,
  category_delete_post,
  category_update_get,
  category_update_post,
} from "../controllers/category.controller.js";

router.get("/", category_list);
router.get("/category/create", category_create_get);
router.post("/category/create", category_create_post);
router.get("/category/:id", category_detail);
router.get("/category/:id/delete", category_delete_get);
router.post("/category/:id/delete", category_delete_post);
router.get("/category/:id/update", category_update_get);
router.post("/category/:id/update", category_update_post);

export default router;
