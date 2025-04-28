import { Request, Response } from "express";
import Community from "../models/community.model";
import User from "../models/user.model";
import { getReceiverSocketId, io } from "../socket/socket";

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const groupdId = req.params.id;
        const senderId = req.user?._id;

        if (!senderId) {
            res.status(400).json({ error: "Cannot fetch Sender ID" });
            return;
        }

        const community = await Community.findOne({ groupdId });
        if (!community) {
            res.status(400).json({ error: "Community not found" });
            return;
        }

        const sender = await User.findById(senderId).select("_id name profilePic");
        if (!sender) {
            res.status(400).json({ error: "Sender not found" });
            return;
        }

        const newMessage = {
            sender,
            message,
        };

        community.chats.push({
            sender: senderId,
            message,
        });

        await community.save();

        for (const memberId of community.members) {
            if (memberId.toString() === senderId.toString()) continue;

            const receiverSocketId = getReceiverSocketId(memberId.toString());
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("newMessage", newMessage);
            }
        }

        res.status(200).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};