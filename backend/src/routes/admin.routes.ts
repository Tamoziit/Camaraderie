import express from "express";
import { getAdminToken, migrateGroupIsDoneField } from "../controllers/admin.controller";
import verifyAdmin from "../middlewares/admin.middleware";

const router = express.Router();

router.post("/get-token", getAdminToken);
router.post("/migrate-group-isdone", verifyAdmin, migrateGroupIsDoneField);

export default router;