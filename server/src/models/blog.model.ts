import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
        minLength: [5, "Atleast 5 character"],
        required: [true, "Title is required"],
        trim: true
    },
    content: {
        type: String,
        minLength: [5, "Atleast 5 character"],
        required: [true, "Content is required"],
    },
    image: {
        type: String,
        default: "image.png"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    tags: [String],
    category: {
        type: String,
        required: true,
        enum: ["Technology", "Health", "Lifestyle", "Education", "Travel", "Finance", "Entertainment", "Business"]
    }
}, {
    timestamps: true
})

const blogModel = mongoose.model("Blog", blogSchema);

export default blogModel