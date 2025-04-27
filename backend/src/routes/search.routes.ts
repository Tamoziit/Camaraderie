import express from "express";
import verifyToken from "../middlewares/auth.middleware";
import { searchGroups, suggestions } from "../controllers/search.controller";

const router = express.Router();

router.post("/", verifyToken, searchGroups);
router.get("/suggestions", verifyToken, suggestions);

export default router;