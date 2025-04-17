import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ],
    requests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ],
    destination: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    transport: {
        mode: {
            type: String,
            required: true
        },
        pickup: {
            type: String,
            required: true
        },
        departure: {
            type: Date,
            required: true
        },
        arrival: {
            type: Date,
            required: true
        },
        PNR: {
            type: String
        }
    },
    intrinsicStrength: {
        type: Number,
        default: 7.0,
        required: true
    },
    preferences: [
        {
            tag: {
                type: String,
                required: true
            },
            frequency: {
                type: Number,
                default: 0,
                required: true
            }
        }
    ],
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
        required: true
    },
    iternary: [
        {
            name: {
                type: String,
                required: true
            },
            details: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true
            },
            isDone: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ],
    budgetSplitter: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            expenditure: {
                type: Number,
                default: 0.0,
                required: true
            },
            received: {
                type: Number,
                default: 0.0,
                required: true
            }
        }
    ]
}, { timestamps: true });

const Group = mongoose.model("Group", GroupSchema);
export default Group;