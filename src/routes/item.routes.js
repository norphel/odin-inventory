import { Router } from "express";
const router = Router();

import {
  item_list,
  item_detail,
  item_create_get,
  item_create_post,
  item_delete_get,
  item_delete_post,
  item_update_get,
  item_update_post,
} from "../controllers/item.controller.js";

router.get("/", item_list);
router.get("/item/create", item_create_get);
router.post("/item/create", item_create_post);
router.get("/item/:id", item_detail);
router.get("/item/:id/delete", item_delete_get);
router.post("/item/:id/delete", item_delete_post);
router.get("/item/:id/update", item_update_get);
router.post("/item/:id/update", item_update_post);

export default router;
