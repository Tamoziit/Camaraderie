import { Types } from "mongoose";
import { Request } from "express";

export interface AdminToken {
    password: string
}

export interface SignupBody {
    name: string;
    email: string;
    password: string;
    mobileNo: string;
    dob: string;
    age: number;
    gender: "M" | "F" | "O";
    address: string;
    profession: "student" | "professional" | "other";
    institute: string;
    company: string;
    otherProfession: string;
}

export interface LoginBody {
    email: string;
    mobileNo: string;
    password: string;
}

import { Types } from "mongoose";

export interface User {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    mobileNo: string;
    gender: "M" | "F" | "O";
    dob: string;
    age: number;
    address: string;
    profilePic?: string;
    profession: "student" | "professional" | "other";
    institute?: string;
    company?: string;
    otherProfession?: string;
    currentGroup?: Types.ObjectId;
    totalTrips: Types.ObjectId[];
    isVerified: boolean;
    archetype: string;
    preferences: string[];
    reviews?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

declare module "express" {
    export interface Request {
        user?: User;
    }
}