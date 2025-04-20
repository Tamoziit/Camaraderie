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
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    transport: {
        mode: {
            type: String
        },
        name: {
            type: String
        },
        pickup: {
            type: String
        },
        departure: {
            type: String
        },
        arrival: {
            type: String
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
                type: String,
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
    ],
    isDone: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Group = mongoose.model("Group", GroupSchema);
export default Group;