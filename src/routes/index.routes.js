import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("Index route");
});

export default router;
