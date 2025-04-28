import express from "express";
import verifyToken from "../middlewares/auth.middleware";
import { sendMessage } from "../controllers/community.controller";

const router = express.Router();

router.post("/send-message/:id", verifyToken, sendMessage);

export default router;