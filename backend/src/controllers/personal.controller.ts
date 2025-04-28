import { Request, Response } from "express";
import User from "../models/user.model";
import Group from "../models/group.model";
import Community from "../models/community.model";
import { ItineraryProps } from "../types";
import { Types } from "mongoose";

interface ItineraryMarkProps {
    id: Types.ObjectId;
}

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
            model: Group,
            populate: [
                {
                    path: "admin",
                    model: "User",
                    select: "_id name email profilePic"
                },
                {
                    path: "members",
                    model: "User",
                    select: "_id name email profilePic"
                }
            ]
        });

        if (!user) {
            res.status(400).json({ error: "User not found" });
            return;
        }

        if(!user.currentGroup) {
            res.status(200).json({});
            return;
        }

        res.status(200).json(user.currentGroup);
    } catch (error) {
        console.error("Error in getMyCurrentTrip controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getTripbyId = async (req: Request, res: Response) => {
    try {
        const groupId = req.params.id;

        const group = await Group.findById(groupId).populate([
            {
                path: "admin",
                model: "User",
                select: "_id name email profilePic reviews"
            },
            {
                path: "members",
                model: "User",
                select: "_id name email profilePic reviews totalTrips"
            }
        ]);

        if (!group) {
            res.status(400).json({ error: "Group not found" });
            return;
        }

        res.status(200).json(group);
    } catch (error) {
        console.error("Error in getTripById controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


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

        res.status(201).json(trip.iternary);
    } catch (error) {
        console.error("Error in updateItinerary controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const markItineraryDone = async (req: Request, res: Response) => {
    try {
        const groupId = req.params.id;
        const { id }: ItineraryMarkProps = req.body;
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

        const itineraryItem = trip.iternary.find(
            (item: any) => item._id.toString() === id
        );

        if (!itineraryItem) {
            res.status(400).json({ error: "Itinerary item not found" });
            return;
        }

        itineraryItem.isDone = true;
        await trip.save();
        res.status(200).json(trip.iternary);
    } catch (error) {
        console.error("Error in updateItinerary controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}