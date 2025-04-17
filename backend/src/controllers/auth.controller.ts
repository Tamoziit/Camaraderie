import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { client } from "../redis/client";
import { LoginBody, SignupBody } from "../types";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie";

export const signup = async (req: Request, res: Response) => {
    try {
        const {
            name,
            email,
            password,
            mobileNo,
            aadharNo,
            dob,
            age,
            gender,
            address,
            profession,
            institute,
            company,
            otherProfession
        }: SignupBody = req.body;

        if (password.length < 6) {
            res.status(400).json({ error: "Password should be at least 6 characters long" });
            return;
        }
        if (mobileNo.length !== 10) {
            res.status(400).json({ error: "Enter a valid Mobile no." });
            return;
        }
        if (aadharNo.length !== 12) {
            res.status(400).json({ error: "Enter a valid Aadhar no." });
            return;
        }
        if (name.length < 2) {
            res.status(400).json({ error: "Name should be at least 2 characters long" });
            return;
        }
        if (gender !== "M" && gender !== "F" && gender !== "O") {
            res.status(400).json({ error: "Enter valid gender data" });
            return;
        }
        if (profession === "student" && !institute) {
            res.status(400).json({ error: "Institute name is required for Students" });
            return;
        }
        if (profession === "professional" && !company) {
            res.status(400).json({ error: "Company name is required for Working Professionals" });
            return;
        }
        if (profession === "other" && !otherProfession) {
            res.status(400).json({ error: "Specify your designation or work affiliation" });
            return;
        }

        const sameUser = await User.findOne({ $or: [{ email }, { mobileNo }] });
        if (sameUser) {
            res.status(400).json({
                error: sameUser.mobileNo === mobileNo ? "A user with this mobile no. already exists. Use another mobile no., or try logging into your account." : "A user with this Email. already exists. Use another Email., or try logging into your account."
            });
            return;
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: passwordHash,
            mobileNo,
            aadharNo,
            dob,
            age,
            gender,
            address,
            profession,
            institute,
            company,
            otherProfession
        });

        if (newUser) {
            await newUser.save();

            const token = generateTokenAndSetCookie(newUser._id, res);
            const payload = {
                token,
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                mobileNo: newUser.mobileNo,
                aadharNo: newUser.aadharNo,
                dob: newUser.dob,
                age: newUser.age,
                gender: newUser.gender,
                address: newUser.address,
                profession: newUser.profession,
                isVerified: newUser.isVerified,
            }

            await client.set(`CM-user:${newUser._id}`, JSON.stringify(payload));
            await client.expire(`CM-user:${newUser._id}`, 30 * 24 * 60 * 60);

            res.status(201)
                .header("Authorization", `Bearer ${token}`)
                .json({
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    mobileNo: newUser.mobileNo,
                    aadharNo: newUser.aadharNo,
                    dob: newUser.dob,
                    age: newUser.age,
                    gender: newUser.gender,
                    address: newUser.address,
                    profilePic: newUser.profilePic,
                    profession: newUser.profession,
                    institute: newUser.institute,
                    company: newUser.company,
                    otherProfession: newUser.otherProfession,
                    isVerified: newUser.isVerified,
                    archetype: newUser.archetype,
                    intrinsicStrength: newUser.intrinsicStrength,
                    preferences: newUser.preferences,
                    token
                });
        }
    } catch (error) {
        console.log("Error in Signup controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, mobileNo, password }: LoginBody = req.body;
        const user = await User.findOne({ $or: [{ email }, { mobileNo }] });
        if (!user) {
            res.status(400).json({ error: "Cannot find User" });
            return;
        }

        const isPaswordCorrect = await bcrypt.compare(password, user.password || "");
        if (!isPaswordCorrect) {
            res.status(400).json({ error: "Invalid Login Credentials" });
            return;
        }

        res.cookie("cm_jwt", "", { maxAge: 0 });
        const token = generateTokenAndSetCookie(user._id, res);
        const payload = {
            token,
            _id: user._id,
            name: user.name,
            email: user.email,
            mobileNo: user.mobileNo,
            aadharNo: user.aadharNo,
            dob: user.dob,
            age: user.age,
            gender: user.gender,
            address: user.address,
            profession: user.profession,
            isVerified: user.isVerified,
        }

        await client.set(`CM-user:${user._id}`, JSON.stringify(payload));
        await client.expire(`CM-user:${user._id}`, 30 * 24 * 60 * 60);

        res.status(201)
            .header("Authorization", `Bearer ${token}`)
            .json({
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
                token
            });
    } catch (error) {
        console.log("Error in Login controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        res.cookie("cm_jwt", "", { maxAge: 0 });
        await client.del(`CM-user:${userId}`);

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in Logging out", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}