import express, { Request, Response } from "express";
import { isAuthenticated } from "../controllers/auth.controller";

const userRouter = express.Router()

userRouter.put("/", isAuthenticated, (req: Request, res: Response) => {
    if (req.body.email != req.session.user?.email) throw new Error("Wrong User")
    if (req.body.username === req.session.user?.username && req.body.image === req.session.user?.picture) return res.send("No changes.")

})

export default userRouter