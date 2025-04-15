import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AdminToken } from "../types";

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