import { Router } from "express"
import { userMiddleware } from "../middlewares/user.middleware";
import { createBlog, deleteBlog, editBlog, getAllBlog, getBlog, getUserBlog, likePost, unlikePost } from "../controllers/blog.controller";
const blogRouter = Router();

blogRouter.post('/create', userMiddleware, createBlog)

blogRouter.get('/all', getAllBlog)

blogRouter.get('/myblogs', userMiddleware, getUserBlog)

blogRouter.get('/:id', userMiddleware, getBlog)

blogRouter.put('/edit/:id', userMiddleware, editBlog)

blogRouter.delete('/delete/:id', userMiddleware, deleteBlog)

blogRouter.post('/like/:id', userMiddleware, likePost)

blogRouter.delete('/unlike/:id', userMiddleware, unlikePost)

// Search Blog

export default blogRouter