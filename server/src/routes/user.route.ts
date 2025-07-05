import { Router } from "express"
import { userMiddleware } from "../middlewares/user.middleware";
import { getMeProfile, getUserProfile, updateUserProfilePic } from "../controllers/user.controller";
const userRouter = Router();

userRouter.get('/me', userMiddleware, getMeProfile)

userRouter.get('/:id', getUserProfile)

userRouter.put('/', userMiddleware, updateUserProfilePic)

export default userRouter