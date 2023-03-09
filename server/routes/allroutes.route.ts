import express from "express";
import exerciseRouter from "./exercise.routes";
import goalRouter from "./goal.router";
import authRouter from "./auth.routes";
const allRouters = express.Router()

allRouters.use("/authentication", authRouter)
allRouters.use("/exercises", exerciseRouter)

allRouters.use("/goals", goalRouter)

export { allRouters as allRoutes }
