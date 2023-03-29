import express, { Request, Response } from "express";
import { isAuthenticated } from "../controllers/auth.controller";

const userRouter = express.Router()

userRouter.patch("/", isAuthenticated, (req: Request, res: Response) => {
    console.log("body patch /users", req.body)
    console.log("session user", req.session.user)
    console.log(req.body.username === req.session.user?.username)
    console.log(req.session.user?.picture.localeCompare(req.body.avatar))

    console.log(req.body.avatar === req.session.user?.picture)

    // Check for changes
    if (req.body.username === req.session.user?.username &&
        req.body.avatar === req.session.user?.picture) {

        return res.status(204).send("No changes.")
    }

    // Add image to blob storage

    // Change user in database.
    res.sendStatus(404)


})

export default userRouter