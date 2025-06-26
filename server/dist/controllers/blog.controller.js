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
exports.deleteBlog = exports.editBlog = exports.createBlog = exports.getAllBlog = void 0;
const zod_1 = require("zod");
const blog_model_1 = __importDefault(require("../models/blog.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../models/user.model"));
const blogSchema = zod_1.z.object({
    title: zod_1.z.string().min(5, "Atleast 5 Character"),
    content: zod_1.z.string().min(5, "Atleast 5 Characters"),
    image: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional()
});
const getAllBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blog_model_1.default.find({});
        res.status(200).json({
            blogs
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.getAllBlog = getAllBlog;
const createBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, image, tags } = req.body;
        const userId = req.user;
        const validate = blogSchema.safeParse(req.body);
        if (!validate.success) {
            res.status(400).json({
                message: "Validation Error",
                error: validate.error.flatten().fieldErrors
            });
            return;
        }
        if (!userId) {
            res.status(404).json({
                message: "Unauthorized"
            });
            return;
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
            res.status(404).json({
                message: "Invalid User"
            });
            return;
        }
        const userExist = yield user_model_1.default.findById(userId);
        if (!userExist) {
            res.status(404).json({
                message: "Invalid User"
            });
            return;
        }
        const blog = yield blog_model_1.default.create({
            title,
            content,
            image,
            tags,
            user: userId
        });
        userExist.Blog.push(blog._id);
        yield userExist.save();
        res.status(201).json({
            message: "Blog Created",
            blog
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.createBlog = createBlog;
const editBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user;
        const { id } = req.params;
        const { title, content, image, tags } = req.body;
        const validate = blogSchema.safeParse(req.body);
        if (!validate.success) {
            res.status(400).json({
                errors: validate.error.flatten().fieldErrors
            });
            return;
        }
        if (!userId) {
            res.status(400).json({
                message: "Unauthorized"
            });
            return;
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
            res.status(400).json({
                message: "Mongoose Validation Error"
            });
            return;
        }
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            res.status(404).json({
                message: "User Not Found"
            });
            return;
        }
        const blogExist = yield blog_model_1.default.findById(id);
        if (!blogExist) {
            res.status(400).json({
                message: "Blog doesnt exist"
            });
            return;
        }
        if ((blogExist === null || blogExist === void 0 ? void 0 : blogExist.user.toString()) !== userId.toString()) {
            res.status(400).json({
                message: "Invalid Blog"
            });
            return;
        }
        const blogEdit = yield blog_model_1.default.findByIdAndUpdate(id, {
            title,
            content,
            image,
            tags
        }, { new: true });
        res.status(200).json({
            message: "Blog Edited",
            blog: blogEdit
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.editBlog = editBlog;
const deleteBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user;
        if (!mongoose_1.default.Types.ObjectId.isValid(id) || !id) {
            res.status(400).json({
                message: "Wrong Id or not present"
            });
            return;
        }
        if (!userId || !mongoose_1.default.Types.ObjectId.isValid(userId)) {
            res.status(400).json({
                message: "Invalid userId or not present"
            });
            return;
        }
        const blog = yield blog_model_1.default.findById(id);
        if (!blog) {
            res.status(400).json({
                message: "Blog Not Found"
            });
            return;
        }
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            res.status(404).json({
                message: "User not exist"
            });
            return;
        }
        const blogIndex = user === null || user === void 0 ? void 0 : user.Blog.indexOf(new mongoose_1.default.Types.ObjectId(id));
        user === null || user === void 0 ? void 0 : user.Blog.splice(blogIndex, 1);
        yield user.save();
        yield blog.deleteOne();
        res.status(200).json({
            message: "Blog Deleted"
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.deleteBlog = deleteBlog;
