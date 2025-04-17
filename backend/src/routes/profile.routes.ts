import express from "express";
import verifyToken from "../middlewares/auth.middleware";
import { getArchetype, updateProfile } from "../controllers/profile.controller";

const router = express.Router();

router.patch("/update", verifyToken, updateProfile);
router.post("/archetype", verifyToken, getArchetype);
//router.patch("/verify");

export default router;