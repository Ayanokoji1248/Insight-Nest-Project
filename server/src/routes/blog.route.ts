import { Router } from "express"
import { userMiddleware } from "../middlewares/user.middleware";
import { createBlog } from "../controllers/blog.controller";
const blogRouter = Router();

blogRouter.post('/create', userMiddleware, createBlog)

export default blogRouter