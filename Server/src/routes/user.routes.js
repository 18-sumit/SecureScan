import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { rateLimiter } from "../middleware/rateLimiter.middleware.js";


const userRouter = Router();

userRouter.route('/register').post(rateLimiter ,registerUser);
userRouter.route('/login').post(rateLimiter ,loginUser);

// protected route:
userRouter.route('/logout').post(verifyJWT, logoutUser)



export { userRouter }