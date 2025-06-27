import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    comment: {
        type: String,
        minLength: 5,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog"
    }
}, {
    timestamps: true
})

const commentModel = mongoose.model("comment", commentSchema);

export default commentModel