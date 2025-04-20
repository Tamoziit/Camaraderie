import { Request, Response } from "express";
import User from "../models/user.model";
import { ReviewProps } from "../types";

export const getMyReviews = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user?._id);
        if (!user) {
            res.status(400).json({ error: "Cannot find User" });
            return;
        }

        res.status(200).json(user.reviews.reverse());
    } catch (error) {
        console.error("Error in getMyReviews controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const postFeedback = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const {
            rating,
            message
        }: ReviewProps = req.body;
        if (userId.toString() == req.user?._id?.toString()) {
            res.status(400).json({ error: "You cannot give yourself a review" });
            return;
        }

        const user = await User.findById(userId);
        if (!user) {
            res.status(400).json({ error: "Cannot find User" });
            return;
        }
        if (rating < 0 || rating > 10) {
            res.status(400).json({ error: "Rating should be within the range 0-10" });
            return;
        }

        const review = {
            rating,
            message
        }
        user.reviews.push(review);
        user.save();

        res.status(200).json(user.reviews.reverse());
    } catch (error) {
        console.error("Error in postFeedback controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getReviews = async(req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            res.status(400).json({ error: "Cannot find User" });
            return;
        }

        res.status(200).json(user.reviews.reverse());
    } catch (error) {
        console.error("Error in getReviews controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}