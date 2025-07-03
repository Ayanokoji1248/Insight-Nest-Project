"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.editComment = exports.createComment = exports.getallComments = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const blog_model_1 = __importDefault(require("../models/blog.model"));
const comment_model_1 = __importDefault(require("../models/comment.model"));
const zod_1 = require("zod");
const commentSchema = zod_1.z.object({
    comment: zod_1.z.string().min(1, "Comment cannot be empty")
});
const getallComments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || !mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(404).json({
                message: "Invalid Id or Not found"
            });
            return;
        }
        const comments = yield comment_model_1.default.find({
            blog: id
        }).populate("user", "username fullName avatar");
        if (!comments || comments.length === 0) {
            res.status(400).json({
                message: "No Comments"
            });
            return;
        }
        res.status(200).json({
            message: "All Comments",
            comments
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
exports.getallComments = getallComments;
const createComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user;
        const { comment } = req.body;
        console.log(comment);
        const validate = commentSchema.safeParse(req.body);
        console.log(validate);
        if (!validate.success) {
            res.status(400).json({
                errors: validate.error.flatten().fieldErrors
            });
            return;
        }
        if (!id) {
            res.status(400).json({
                message: "Invalid Id"
            });
            return;
        }
        if (!userId || !mongoose_1.default.Types.ObjectId.isValid(userId)) {
            res.status(400).json({
                message: "Invalid Id"
            });
            return;
        }
        const blog = yield blog_model_1.default.findById(id);
        if (!blog) {
            res.status(404).json({
                message: "Blog not found"
            });
            return;
        }
        const commentData = yield comment_model_1.default.create({
            comment,
            user: userId,
            blog: id
        });
        blog.comments.push(commentData._id);
        yield blog.save();
        res.status(201).json({
            message: "comment created",
            comment: commentData
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Interal Server Error"
        });
    }
});
exports.createComment = createComment;
const editComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        // Validate comment content
        const validate = commentSchema.safeParse({ comment });
        if (!validate.success) {
            res.status(400).json({
                errors: validate.error.flatten().fieldErrors
            });
            return;
        }
        // Validate ObjectId
        if (!id || !mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(404).json({
                message: "Invalid Comment ID"
            });
            return;
        }
        const updatedComment = yield comment_model_1.default.findByIdAndUpdate(id, { comment }, { new: true });
        if (!updatedComment) {
            res.status(404).json({
                message: "Comment not found"
            });
            return;
        }
        res.status(200).json({
            message: "Comment edited",
            comment: updatedComment
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
exports.editComment = editComment;
const deleteComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || !mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                message: "Invalid Id or not present"
            });
            return;
        }
        const comment = yield comment_model_1.default.findById(id);
        if (!comment) {
            res.status(404).json({
                message: "Comment Not Found"
            });
            return;
        }
        const blogId = comment.blog;
        yield comment_model_1.default.findByIdAndDelete(id);
        yield blog_model_1.default.findByIdAndUpdate(blogId, {
            $pull: { comments: new mongoose_1.default.Types.ObjectId(id) }
        });
        res.status(200).json({
            message: "Comment Deleted"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.deleteComment = deleteComment;
