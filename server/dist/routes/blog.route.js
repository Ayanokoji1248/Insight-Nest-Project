"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middleware_1 = require("../middlewares/user.middleware");
const blog_controller_1 = require("../controllers/blog.controller");
const blogRouter = (0, express_1.Router)();
blogRouter.post('/create', user_middleware_1.userMiddleware, blog_controller_1.createBlog);
exports.default = blogRouter;
