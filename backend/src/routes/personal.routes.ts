import express from "express";
import verifyToken from "../middlewares/auth.middleware";
import { getMyCurrentTrip, getMyTrips } from "../controllers/personal.controller";

const router = express.Router();

router.get("/my-trips", verifyToken, getMyTrips);
router.get("/my-current-trip", verifyToken, getMyCurrentTrip);

export default router;