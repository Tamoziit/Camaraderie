import express from "express";
import verifyToken from "../middlewares/auth.middleware";
import { getSplitter, updateSplitter } from "../controllers/budget.controller";

const router = express.Router();

router.patch("/update-splitter/:id", verifyToken, updateSplitter);
router.get("/get-splitter/:id", verifyToken, getSplitter);

export default router;