import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    fullName: {
        type: String,
        minLength: [6, "Minimum 6 character"],
        required: true,
    },
    username: {
        type: String,
        minLength: [4, "Minimum 4 character"],
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [5, "Minimum 5 character"]
    },
    bio: {
        type: String,
    },
    avatar: {
        type: String,
        default: "profile.png"
    },
    Blog: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog"
    }],
    follower: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    favBlog: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog"
    }]
}, {
    timestamps: true
})

const userModel = mongoose.model("User", userSchema)

export default userModel