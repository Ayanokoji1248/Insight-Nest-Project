import { Router } from "express"
import { userMiddleware } from "../middlewares/user.middleware";
import { createBlog, deleteBlog, editBlog, getAllBlog, getBlog, getUserBlog, likePost, searchBlog, unlikePost } from "../controllers/blog.controller";
const blogRouter = Router();

blogRouter.post('/create', userMiddleware, createBlog)

blogRouter.get('/all', getAllBlog)

// Search Blog
blogRouter.get('/search', userMiddleware, searchBlog)

blogRouter.get('/myblogs', userMiddleware, getUserBlog)

// Unauthenticated person can view
blogRouter.get('/:id', getBlog)

blogRouter.put('/edit/:id', userMiddleware, editBlog)

blogRouter.delete('/delete/:id', userMiddleware, deleteBlog)

blogRouter.post('/like/:id', userMiddleware, likePost)

blogRouter.delete('/unlike/:id', userMiddleware, unlikePost)



export default blogRouter