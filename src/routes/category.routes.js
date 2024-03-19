import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("category route");
});

export default router;
