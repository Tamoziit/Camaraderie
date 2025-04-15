import { Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const generateTokenAndSetCookie = (userId: Types.ObjectId, res: Response) => {
    //JWT token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
        expiresIn: '30d'
    });

    //Auth cookies
    res.cookie("cm_jwt", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    });

    return token;
}

export default generateTokenAndSetCookie;