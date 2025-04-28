import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"]
    }
});

const userSocketMap: { [userId: string]: string } = {};

const groupUserMap: { [groupId: string]: Set<string> } = {};

export const getReceiverSocketId = (receiverId: string) => {
    return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    const userId = socket.handshake.query.userId;

    if (typeof userId === "string" && userId !== "undefined") {
        userSocketMap[userId] = socket.id;

        socket.on("join-group", (groupId: string) => {
            socket.join(groupId);
            console.log(`User ${userId} joined group ${groupId}`);

            if (!groupUserMap[groupId]) groupUserMap[groupId] = new Set();
            groupUserMap[groupId].add(userId);

            socket.to(groupId).emit("receive-message", `${userId} joined the group`);
        });


        socket.on("disconnect", () => {
            console.log("User disconnected", socket.id);
            delete userSocketMap[userId];

            for (const groupId in groupUserMap) {
                groupUserMap[groupId].delete(userId);
                if (groupUserMap[groupId].size === 0) {
                    delete groupUserMap[groupId];
                }
            }
        });
    }
});

export { app, io, server };