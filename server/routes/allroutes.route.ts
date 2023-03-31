import express from "express";
import exerciseRouter from "./exercise.routes";
import goalRouter from "./goal.router";
import authRouter from "./auth.routes";
import postRouter from "./post.router";
import userRouter from "./user.router";

const allRouters = express.Router()

allRouters.use("/authentication", authRouter)
allRouters.use("/exercises", exerciseRouter)
allRouters.use("/goals", goalRouter)
allRouters.use("/posts", postRouter)
allRouters.use("/users", userRouter)

export { allRouters as allRoutes }
