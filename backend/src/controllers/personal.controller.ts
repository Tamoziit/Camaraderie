import { Request, Response } from "express";
import User from "../models/user.model";
import Group from "../models/group.model";
import { client } from "../redis/client";

export const getMyTrips = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user?._id).populate({
            path: "totalTrips",
            model: Group
        });

        if (!user) {
            res.status(400).json({ error: "Cannot find User" });
            return;
        }

        res.status(200).json(user.totalTrips);
    } catch (error) {
        console.error("Error in getMyTrips controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getMyCurrentTrip = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(400).json({ error: "User ID missing in request" });
            return;
        }

        const cachedTrip = await client.get(`CM-user-currTrip:${userId}`);
        if (cachedTrip) {
            res.status(200).json(JSON.parse(cachedTrip));
            return;
        }

        const user = await User.findById(req.user?._id).populate({
            path: "currentGroup",
            model: Group
        });

        if (!user || !user.currentGroup) {
            res.status(400).json({ error: "Current trip not found" });
            return;
        }


        await client.set(`CM-user-currTrip:${userId}`, JSON.stringify(user.currentGroup));
        await client.expire(`CM-user-currTrip:${userId}`, 30 * 24 * 60 * 60);

        res.status(200).json(user.currentGroup);
    } catch (error) {
        console.error("Error in getMyCurrentTrip controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}