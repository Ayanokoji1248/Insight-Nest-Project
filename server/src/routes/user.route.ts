import { Router } from "express"
import { userMiddleware } from "../middlewares/user.middleware";
import { getMeProfile, getUserProfile } from "../controllers/user.controller";
const userRouter = Router();

userRouter.get('/me', userMiddleware, getMeProfile)

userRouter.get('/:id', userMiddleware, getUserProfile)

export default userRouter