import { Request, Response } from "express";
import User from "../models/user.model";
import Group from "../models/group.model";
import { GroupCreationProps } from "../types";

export const searchGroups = async (req: Request, res: Response) => {
    try {
        const {
            destination,
            startDate,
            endDate,
            transport
        }: GroupCreationProps = req.body;

        const user = await User.findById(req.user?._id);
        if (!user) {
            res.status(400).json({ message: "User not found" });
            return;
        }

        // Step 1: Getting all groups the user is not a part of
        const groups = await Group.find({
            _id: { $nin: user.totalTrips }, // Excluding groups the user is already part of
            isDone: false
        }).populate({
            path: "admin",
            model: User,
            select: "_id name email profilePic"
        });

        // Step 2: Filtering groups based on criteria
        const compatibleGroups = groups.filter(group => {
            // Destination check
            const isDestinationMatch = destination ? group.destination.toLowerCase() === destination.toLowerCase() : true;

            // Date check (startDate and endDate)
            const isDateMatch = startDate && endDate ?
                (new Date(group.startDate) <= new Date(endDate) && new Date(group.endDate) >= new Date(startDate)) : true;

            // Transport check
            const isTransportMatch = transport && transport.mode ?
                (group.transport && group.transport.mode === transport.mode || group.transport && group.transport.name === transport.name) : true;

            // Intrinsic Strength check (±1.5 tolerance)
            const isStrengthMatch = Math.abs(group.intrinsicStrength - user.intrinsicStrength) <= 1.5;

            return isDestinationMatch && isDateMatch && isTransportMatch && isStrengthMatch;
        });

        res.status(200).json(compatibleGroups);
    } catch (error) {
        console.log("Error in searchGroups controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
