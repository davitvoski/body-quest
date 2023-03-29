import express from "express";
import { isAuthenticated } from "../controllers/auth.controller";
import { updateUserInformationPATCH } from "../controllers/user.controller";

const userRouter = express.Router()


userRouter.patch("/", isAuthenticated, updateUserInformationPATCH)



export default userRouter