import express from "express";
import verifyToken from "../middlewares/auth.middleware";
import { acceptJoinRequest, createGroup, sendJoinGroupRequest, viewRequests } from "../controllers/group.controller";

const router = express.Router();

router.post("/create-group", verifyToken, createGroup);
router.post("/join-request/:id", verifyToken, sendJoinGroupRequest);
router.get("/get-requests/:id", verifyToken, viewRequests);
router.post("/accept-request/:id", verifyToken, acceptJoinRequest);

export default router;