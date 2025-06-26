import { Router } from "express"
import { userMiddleware } from "../middlewares/user.middleware";
import { createBlog, deleteBlog, editBlog, getAllBlog, getBlog } from "../controllers/blog.controller";
const blogRouter = Router();

blogRouter.post('/create', userMiddleware, createBlog)

blogRouter.get('/:id', userMiddleware, getBlog)

blogRouter.get('/all', userMiddleware, getAllBlog)

blogRouter.put('/edit/:id', userMiddleware, editBlog)

blogRouter.delete('/delete/:id', userMiddleware, deleteBlog)

export default blogRouter