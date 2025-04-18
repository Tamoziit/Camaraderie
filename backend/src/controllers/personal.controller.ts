import { Request, Response } from "express";
import User from "../models/user.model";
import Group from "../models/group.model";
import { client } from "../redis/client";
import Community from "../models/community.model";
import { ItineraryProps } from "../types";

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
        const user = await User.findById(req.user?._id).populate({
            path: "currentGroup",
            model: Group
        });

        if (!user || !user.currentGroup) {
            res.status(400).json({ error: "Current trip not found" });
            return;
        }

        res.status(200).json(user.currentGroup);
    } catch (error) {
        console.error("Error in getMyCurrentTrip controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getMembers = async (req: Request, res: Response) => {
    try {
        const groupId = req.params.id;
        const trip = await Group.findById(groupId).populate({
            path: "members",
            model: User,
            select: "-password"
        });

        if (!trip) {
            res.status(400).json({ error: "Cannot find this trip" });
            return;
        }
        if (!req.user?._id) {
            res.status(400).json({ error: "Cannot find User" });
            return;
        }
        if (!trip.members.some((member: any) => member._id.toString() === req.user!._id!.toString())) {
            res.status(400).json({ error: "You are not a member of this Group" });
            return;
        }

        res.status(200).json(trip.members);
    } catch (error) {
        console.error("Error in getMembers controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const fetchCommunity = async (req: Request, res: Response) => {
    try {
        const groupdId = req.params.id;
        const community = await Community.findOne({ groupdId }).populate({
            path: "members",
            model: User,
            select: "_id name email profilePic"
        });

        if (!community) {
            res.status(400).json({ error: "Cannot find this trip" });
            return;
        }
        if (!req.user?._id) {
            res.status(400).json({ error: "Cannot find User" });
            return;
        }
        if (!community.members.some((member: any) => member._id.toString() === req.user!._id!.toString())) {
            res.status(400).json({ error: "You are not a member of this Group" });
            return;
        }

        res.status(200).json(community);
    } catch (error) {
        console.error("Error in fetchCommunity controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getItinerary = async (req: Request, res: Response) => {
    try {
        const groupId = req.params.id;
        const trip = await Group.findById(groupId);

        if (!trip) {
            res.status(400).json({ error: "Cannot find this trip" });
            return;
        }
        if (!req.user?._id) {
            res.status(400).json({ error: "Cannot find User" });
            return;
        }
        if (!trip.members.some((member: any) => member._id.toString() === req.user!._id!.toString())) {
            res.status(400).json({ error: "You are not a member of this Group" });
            return;
        }

        res.status(200).json(trip.iternary);
    } catch (error) {
        console.error("Error in getItinerary controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const updateItinerary = async (req: Request, res: Response) => {
    try {
        const groupId = req.params.id;
        const {
            name,
            details,
            date
        }: ItineraryProps = req.body;
        const trip = await Group.findById(groupId);

        if (!trip) {
            res.status(400).json({ error: "Cannot find this trip" });
            return;
        }
        if (!req.user?._id) {
            res.status(400).json({ error: "Cannot find User" });
            return;
        }
        if (trip.admin.toString() !== req.user?._id?.toString()) {
            res.status(400).json({ error: "Only admin can update Itinerary" });
            return;
        }

        const event = {
            name,
            details,
            date
        }
        trip.iternary.push(event);
        await trip.save();

        res.status(200).json(trip.iternary);
    } catch (error) {
        console.error("Error in updateItinerary controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}