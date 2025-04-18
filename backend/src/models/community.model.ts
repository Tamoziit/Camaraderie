import mongoose from "mongoose";

const CommunitySchema = new mongoose.Schema({
    groupdId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
        required: true
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ],
    chats: [
        {
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            message: {
                type: String,
                required: true
            }
        }
    ]
}, { timestamps: true });

const Community = mongoose.model("Community", CommunitySchema);
export default Community;