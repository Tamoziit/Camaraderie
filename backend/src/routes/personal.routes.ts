import express from "express";
import verifyToken from "../middlewares/auth.middleware";
import { fetchCommunity, getItinerary, getMembers, getMyCurrentTrip, getMyTrips, updateItinerary } from "../controllers/personal.controller";

const router = express.Router();

router.get("/my-trips", verifyToken, getMyTrips);
router.get("/my-current-trip", verifyToken, getMyCurrentTrip);
router.get("/members/:id", verifyToken, getMembers);
router.get("/community/:id", verifyToken, fetchCommunity);
router.get("/itinerary/:id", verifyToken, getItinerary);
router.post("/itinerary/update/:id", verifyToken, updateItinerary);

export default router;