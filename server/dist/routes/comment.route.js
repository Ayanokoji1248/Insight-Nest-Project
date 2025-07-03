"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middleware_1 = require("../middlewares/user.middleware");
const comment_controller_1 = require("../controllers/comment.controller");
const commentRouter = (0, express_1.Router)();
// Here the Id will be of blog
commentRouter.post('/:id', user_middleware_1.userMiddleware, comment_controller_1.createComment);
commentRouter.get('/:id', comment_controller_1.getallComments);
commentRouter.put('/:id', user_middleware_1.userMiddleware, comment_controller_1.editComment);
commentRouter.delete('/:id', user_middleware_1.userMiddleware, comment_controller_1.deleteComment);
exports.default = commentRouter;
