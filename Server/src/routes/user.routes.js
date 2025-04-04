import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { loginLimiter, registerLimiter, apiLimiter } from "../middleware/rateLimiter.middleware.js";


const userRouter = Router();

userRouter.route('/register').post(registerLimiter, registerUser);
userRouter.route('/login').post(loginLimiter, loginUser);

// protected route:
userRouter.route('/logout').post(verifyJWT, logoutUser)



export { userRouter }