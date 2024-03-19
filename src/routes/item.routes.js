import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("Item route");
});

export default router;
