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
exports.createBlog = void 0;
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
