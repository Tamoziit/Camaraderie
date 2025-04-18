import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

import { client } from "./redis/client";
import connectToMongoDB from "./db/connectToMongoDB";
import adminRoutes from "./routes/admin.routes";
import authRoutes from "./routes/auth.routes";
import profileRoutes from "./routes/profile.routes";
import groupRoutes from "./routes/group.routes";
import personalRoutes from "./routes/personal.routes";

const PORT = process.env.PORT || 3000;

const app = express();
const corOpts = {
    origin: '*',
    methods: [
        'GET',
        'POST',
        'PATCH',
        'DELETE'
    ],
    allowedHeaders: [
        'Content-Type',
        'Authorization'
    ],
    credentials: true
};

app.use(cors(corOpts));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/v1', (req: Request, res: Response) => {
    res.send('Server Up & Running!');
});

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/groups", groupRoutes);
app.use("/api/v1/personal", personalRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
    connectToMongoDB();

    if (client) {
        console.log("Redis connected");
    } else {
        console.log("Error in connecting to Redis");
    }
});