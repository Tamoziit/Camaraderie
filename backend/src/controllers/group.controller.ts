import { Request, Response } from "express";
import User from "../models/user.model";
import Group from "../models/group.model";
import Community from "../models/community.model";
import { GroupCreationProps } from "../types";
import { Types } from "mongoose";

interface AcceptRequestProps {
    userId: Types.ObjectId;
}

interface Preference {
    tag: string;
    frequency: number;
}


export const createGroup = async (req: Request, res: Response) => {
    try {
        const {
            destination,
            startDate,
            endDate,
            transport
        }: GroupCreationProps = req.body;

        const admin = await User.findById(req.user?._id);
        if (!admin) {
            res.status(400).json({ error: "Cannot find User" });
            return
        }

        const freqMap: Record<string, number> = {};
        admin.preferences?.forEach((tag: string) => {
            freqMap[tag] = (freqMap[tag] || 0) + 1;
        });

        const preferencesArray = Object.entries(freqMap).map(([tag, frequency]) => ({
            tag,
            frequency
        }));

        const newCommunity = new Community({
            groupdId: admin._id, // temp
            members: [admin._id],
            chats: []
        });

        await newCommunity.save();

        const newGroup = new Group({
            admin: admin._id,
            destination,
            startDate,
            endDate,
            transport,
            intrinsicStrength: admin.intrinsicStrength || 7.0,
            members: [admin._id],
            preferences: preferencesArray,
            community: newCommunity._id,
            budgetSplitter: [
                {
                    userId: admin._id,
                    expenditure: 0,
                    received: 0
                }
            ]
        });

        if (newGroup) {
            newCommunity.groupdId = newGroup._id;
            admin.currentGroup = newGroup._id;
            admin.totalTrips.push(newGroup._id);
            await Promise.all([newGroup.save(), newCommunity.save(), admin.save()]);

            res.status(201).json(newGroup);
        } else {
            res.status(400).json({ error: "Error in creating a new Group" });
        }
    } catch (error) {
        console.error("Error in createGroup controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const sendJoinGroupRequest = async (req: Request, res: Response) => {
    try {
        const groupId = req.params.id;
        const group = await Group.findById(groupId);
        const user = await User.findById(req.user?._id);

        if (!group) {
            res.status(400).json({ error: "Cannot find Group" });
            return
        }
        if (!user) {
            res.status(400).json({ error: "Cannot find User" });
            return
        }
        if (group.admin === user._id || group.members.includes(user._id)) {
            res.status(400).json({ error: "You are already in the group" });
            return;
        }
        if (group.requests.includes(user._id)) {
            res.status(400).json({ error: "Request already sent" });
            return;
        }

        group.requests.push(user._id);
        group.save();
        res.status(200).json(group);
    } catch (error) {
        console.error("Error in sendJoinGroupRequest controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const viewRequests = async (req: Request, res: Response) => {
    try {
        const groupId = req.params.id;
        const group = await Group.findById(groupId).populate({
            path: "requests",
            model: User,
            select: "-password"
        });


        if (!group) {
            res.status(400).json({ error: "Cannot find Group" });
            return;
        }
        if (group.admin.toString() !== req.user?._id?.toString()) {
            res.status(400).json({ error: "Only admin can view Joining Requests" });
            return;
        }

        res.status(200).json(group.requests);
    } catch (error) {
        console.error("Error in viewRequest controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const acceptJoinRequest = async (req: Request, res: Response) => {
    try {
        const groupId = req.params.id;
        const { userId }: AcceptRequestProps = req.body;
        if (userId == req.user?._id) {
            res.status(400).json({ error: "You cannot accept your own request" });
            return;
        }

        const group = await Group.findById(groupId);
        const user = await User.findById(userId);
        if (!group) {
            res.status(400).json({ error: "Group not found" });
            return;
        }
        if (!user) {
            res.status(400).json({ error: "User not found" });
            return;
        }

        const requestIndex = group.requests.indexOf(userId);
        if (requestIndex === -1) {
            res.status(400).json({ error: "User has not requested to join this group" });
            return;
        }

        group.requests.splice(requestIndex, 1);
        if (!group.members.includes(userId)) {
            group.members.push(userId);
        }

        // Creating a Set of current tags for fast lookup
        const prefMap: Map<string, number> = new Map();
        group.preferences.forEach(p => prefMap.set(p.tag, p.frequency));

        user.preferences?.forEach(tag => {
            if (prefMap.has(tag)) {
                // Incrementing frequency
                const pref = group.preferences.find(p => p.tag === tag);
                if (pref) pref.frequency += 1;
            } else {
                // Adding new preference
                group.preferences.push({ tag, frequency: 1 });
            }
        });

        group.budgetSplitter.push(
            {
                userId: user._id,
                expenditure: 0,
                received: 0
            }
        );

        const community = await Community.findById(group.community);
        if (!community) {
            res.status(400).json({ error: "Cannot find Community" });
            return
        }
        community.members.push(user._id);

        user.totalTrips.push(group._id);
        user.currentGroup = group._id;

        // weighted mean of intrinsic strengths
        const allMemberIds = group.members;
        const allMembers = await User.find({ _id: { $in: allMemberIds } }, "intrinsicStrength");

        const totalStrength = allMembers.reduce((sum, member) => {
            return sum + (member.intrinsicStrength || 0);
        }, 0);

        const avgIntrinsicStrength = allMembers.length > 0 ? totalStrength / allMembers.length : 0;

        group.intrinsicStrength = Number(avgIntrinsicStrength.toFixed(2));

        await Promise.all([community.save(), group.save(), user.save()]);
        res.status(200).json({
            requests: group.requests,
            members: group.members
        });
    } catch (error) {
        console.error("Error in acceptJoinRequest controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}