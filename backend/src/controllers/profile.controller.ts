import { Request, Response } from "express";
import User from "../models/user.model";
import { archetypes } from "../constants/constants";

interface ArcheType {
    archetype: string;
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.user?._id, req.body, {
            new: true,
            runValidators: true
        }).select("-password");

        if (user) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                mobileNo: user.mobileNo,
                aadharNo: user.aadharNo,
                dob: user.dob,
                age: user.age,
                gender: user.gender,
                address: user.address,
                profilePic: user.profilePic,
                profession: user.profession,
                institute: user.institute,
                company: user.company,
                otherProfession: user.otherProfession,
                isVerified: user.isVerified,
                archetype: user.archetype,
                intrinsicStrength: user.intrinsicStrength,
                preferences: user.preferences,
                token: req.headers.authorization?.split(" ")[1]
            })
        } else {
            res.status(400).json({ error: "Couldn't Update your Profile" });
        }
    } catch (error) {
        console.log("Error in updateProfile controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getArchetype = async (req: Request, res: Response) => {
    try {
        const { archetype }: ArcheType = req.body;
        const user = await User.findById(req.user?._id);
        if (!user) {
            res.status(400).json({ error: "User not found" });
            return;
        }

        let message;
        archetypes.forEach((item) => {
            if (item.archetype === archetype) {
                user.archetype = item.archetype;
                user.intrinsicStrength = item.intrinsicStrength;
                message = item.message;
            }
        });
        await user.save();

        res.status(200).json({
            archetype: user.archetype,
            message,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                mobileNo: user.mobileNo,
                aadharNo: user.aadharNo,
                dob: user.dob,
                age: user.age,
                gender: user.gender,
                address: user.address,
                profilePic: user.profilePic,
                profession: user.profession,
                institute: user.institute,
                company: user.company,
                otherProfession: user.otherProfession,
                isVerified: user.isVerified,
                archetype: user.archetype,
                intrinsicStrength: user.intrinsicStrength,
                preferences: user.preferences,
                token: req.headers.authorization?.split(" ")[1]
            }
        })
    } catch (error) {
        console.log("Error in getArchetype controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}