import { Request, Response } from "express";
import Group from "../models/group.model";
import { BudgetSplitterProps } from "../types";
import calculateBudgetSplitter from "../utils/calculateBudgetSplitter";

export const updateSplitter = async (req: Request, res: Response) => {
    try {
        const {
            expenditure,
            received
        }: BudgetSplitterProps = req.body;
        const groupId = req.params.id;
        const trip = await Group.findById(groupId).populate({
            path: "budgetSplitter.userId",
            select: "name email profilePic"
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

        const budgetSplitterItem = trip.budgetSplitter.find(
            (item: any) => item.userId._id.toString() === req.user!._id!.toString()
        );

        if (!budgetSplitterItem) {
            res.status(400).json({ error: "User not found" });
            return;
        }

        budgetSplitterItem.expenditure = budgetSplitterItem.expenditure + expenditure;
        budgetSplitterItem.received = budgetSplitterItem.received + received;
        await trip.save();

        const updatedSplitter = calculateBudgetSplitter(
            trip.budgetSplitter.map((item: any) => item.toObject())
        );
        res.status(200).json(updatedSplitter);
    } catch (error) {
        console.error("Error in updateSplitter controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getSplitter = async (req: Request, res: Response) => {
    try {
        const groupId = req.params.id;
        const trip = await Group.findById(groupId).populate({
            path: "budgetSplitter.userId",
            select: "name email profilePic"
        });

        if (!trip) {
            res.status(400).json({ error: "Cannot find this trip" });
            return;
        }
        if (!req.user?._id) {
            res.status(400).json({ error: "Cannot find User" });
            return
        }
        if (!trip.members.some((member: any) => member._id.toString() === req.user!._id!.toString())) {
            res.status(400).json({ error: "You are not a member of this Group" });
            return;
        }

        const updatedSplitter = calculateBudgetSplitter(
            trip.budgetSplitter.map((item: any) => item.toObject())
        );
        res.status(200).json(updatedSplitter);
    } catch (error) {
        console.error("Error in getSplitter controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};