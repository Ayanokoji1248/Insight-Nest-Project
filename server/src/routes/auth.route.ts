import { Router } from "express"
import { loginUser, logout, registerUser } from "../controllers/auth.controller";
import { userMiddleware } from "../middlewares/user.middleware";
const authRouter = Router();

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.post('/logout', userMiddleware, logout)

export default authRouter;