import express from "express";
import { isAuthenticated } from "../controllers/auth.controller";
import { updateUserExperiencePATCH } from "../controllers/user.controller";

const userRouter = express.Router()

userRouter.patch("/experience", isAuthenticated, updateUserExperiencePATCH);

export default userRouter
