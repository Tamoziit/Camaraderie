import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AdminToken } from "../types";
import Group from "../models/group.model";

export const getAdminToken = async (req: Request, res: Response) => {
    try {
        const { password }: AdminToken = req.body;
        const adminPassword = process.env.ADMIN_PASSWORD!;

        if (password !== adminPassword) {
            res.status(401).json({ error: "Invalid Admin Credentials" });
            return;
        }

        const payload = {
            adminPassword,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "5h" });
        res.status(200).json(token);
    } catch (error) {
        console.log("Error in getting Admin Token", error);
        res.status(500).json({ error: "Internal Server error" });
    }
}

export const migrateGroupIsDoneField = async (req: Request, res: Response) => {
    try {
        const result = await Group.updateMany(
            { isDone: { $exists: false } },
            { $set: { isDone: false } }
        );

        res.status(200).json({
            message: "Migration completed",
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount,
        });
    } catch (error) {
        console.error("Migration failed:", error);
        res.status(500).json({ error: "Internl Server Error" });
    }
};