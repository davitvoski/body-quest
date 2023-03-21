import express from "express";
import exerciseRouter from "./exercise.routes";
import goalRouter from "./goal.router";
import authRouter from "./auth.routes";
import postRouter from "./post.router";
const allRouters = express.Router()

allRouters.use("/authentication", authRouter)
allRouters.use("/exercises", exerciseRouter)
allRouters.use("/goals", goalRouter)
allRouters.use("/posts", postRouter)

export { allRouters as allRoutes }
