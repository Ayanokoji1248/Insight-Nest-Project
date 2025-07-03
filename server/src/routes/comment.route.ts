import { Router } from "express";
import { userMiddleware } from "../middlewares/user.middleware";
import { createComment, deleteComment, editComment, getallComments } from "../controllers/comment.controller";

const commentRouter = Router()

// Here the Id will be of blog
commentRouter.post('/:id', userMiddleware, createComment)

commentRouter.get('/:id', getallComments)

commentRouter.put('/:id', userMiddleware, editComment)

commentRouter.delete('/:id', userMiddleware, deleteComment)

export default commentRouter