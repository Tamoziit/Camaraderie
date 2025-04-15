import express from "express";
import { getAdminToken } from "../controllers/admin.controller";

const router = express.Router();

router.post("/get-token", getAdminToken);

export default router;