"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middleware_1 = require("../middlewares/user.middleware");
const blog_controller_1 = require("../controllers/blog.controller");
const blogRouter = (0, express_1.Router)();
blogRouter.post('/create', user_middleware_1.userMiddleware, blog_controller_1.createBlog);
blogRouter.get('/all', blog_controller_1.getAllBlog);
// Search Blog
blogRouter.get('/search', user_middleware_1.userMiddleware, blog_controller_1.searchBlog);
blogRouter.get('/myblogs', user_middleware_1.userMiddleware, blog_controller_1.getUserBlog);
// Unauthenticated person can view
blogRouter.get('/:id', blog_controller_1.getBlog);
blogRouter.put('/edit/:id', user_middleware_1.userMiddleware, blog_controller_1.editBlog);
blogRouter.delete('/delete/:id', user_middleware_1.userMiddleware, blog_controller_1.deleteBlog);
blogRouter.post('/like/:id', user_middleware_1.userMiddleware, blog_controller_1.likePost);
blogRouter.delete('/unlike/:id', user_middleware_1.userMiddleware, blog_controller_1.unlikePost);
exports.default = blogRouter;
