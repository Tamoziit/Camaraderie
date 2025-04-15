import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 2,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        min: 6,
        required: true
    },
    mobileNo: {
        type: String,
        min: 10,
        max: 10,
        required: true
    },
    gender: {
        type: String,
        enum: ["M", "F", "O"],
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        min: 2,
        required: true
    },
    profilePic: {
        type: String
    },
    profession: {
        type: String,
        enum: ["student", "professional", "other"],
        required: true
    },
    institute: {
        type: String,
        default: "None",
        min: 2
    },
    company: {
        type: String,
        default: "None",
        min: 2
    },
    otherProfession: {
        type: String,
        default: "None",
        min: 2
    },
    currentGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
    },
    totalTrips: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
            required: true
        }
    ],
    isVerified: {
        type: Boolean,
        default: false,
        required: true
    },
    archetype: {
        type: String,
        default: 'Exploring',
        required: true
    },
    preferences: [
        {
            type: String,
            required: true
        }
    ],
    reviews: [
        {
            type: String,
        }
    ]
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;