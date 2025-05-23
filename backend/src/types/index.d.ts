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
    aadharNo: string;
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

export interface Review {
    rating: number;
    message?: string | null;
}

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
    profilePic?: string | null;
    profession: "student" | "professional" | "other";
    institute?: string;
    company?: string;
    otherProfession?: string;
    currentGroup?: Types.ObjectId | null;
    totalTrips: Types.ObjectId[];
    isVerified: boolean;
    archetype: string;
    intrinsicStrength: number;
    preferences: string[];
    reviews?: Review[];
    createdAt?: Date;
    updatedAt?: Date;
}

declare module "express" {
    export interface Request {
        user?: User;
    }
}

export interface TransportProps {
    mode?: string | null;
    name?: string | null;
    pickup?: string | null;
    departure?: string | null;
    arrival?: string | null;
    PNR?: string | null;
}

export interface GroupCreationProps {
    destination: string;
    startDate: string;
    endDate: string;
    transport?: TransportProps | null;
}

export interface ItineraryProps {
    name: string;
    details: string;
    date: string;
}

export interface ItineraryItem {
    name: string;
    details: string;
    date: string;
    _id: Types.ObjectId,
    isDone: boolean;
}

export interface ReviewProps {
    rating: number;
    message?: string | null;
}

export interface BudgetSplitterProps {
    expenditure: number;
    received: number;
}

export interface BudgetSplitterItem {
    userId: {
        _id: Types.ObjectId,
        name: string;
        email: string;
        profilePic: string;
    },
    expenditure: number;
    received: number;
    _id: Types.ObjectId;
}

export interface ArchetypeProps {
    likes: string[];
    dislikes: string[];
    travelPreferences: {
        destinations: string[],
        groupSize: number;
        pace: "fast" | "planned" | "slow" | "spontaneous",
    };
    canTolerate: string[];
    cannotTolerate: string[];
}

export interface ArchetypeResponse {
    archetype: "The Explorer" | "The Planner" | "The Social Butterfly" | "The Adventurer" | "The Cultural Connoisseur";
    confidence: number;
}