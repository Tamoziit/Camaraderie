import express from "express";
import verifyToken from "../middlewares/auth.middleware";
import { searchGroups } from "../controllers/search.controller";

const router = express.Router();

router.post("/", verifyToken, searchGroups);

export default router;