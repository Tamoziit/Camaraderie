import express from "express";
import verifyToken from "../middlewares/auth.middleware";
import { getMyReviews, getReviews, postFeedback } from "../controllers/reviews.controller";

const router = express.Router();

router.get("/my-reviews", verifyToken, getMyReviews);
router.post("/feedback/:id", verifyToken, postFeedback);
router.get("/:id", verifyToken, getReviews);

export default router;