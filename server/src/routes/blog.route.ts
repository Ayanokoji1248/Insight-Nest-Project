import { Router } from "express"
import { userMiddleware } from "../middlewares/user.middleware";
import { createBlog, deleteBlog, editBlog } from "../controllers/blog.controller";
const blogRouter = Router();

blogRouter.post('/create', userMiddleware, createBlog)

blogRouter.get('/:id', userMiddleware,)

blogRouter.get('/all', userMiddleware,)

blogRouter.put('/edit/:id', userMiddleware, editBlog)

blogRouter.delete('/delete/:id', userMiddleware, deleteBlog)

export default blogRouter