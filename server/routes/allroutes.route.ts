import express from "express";
import exerciseRouter from "./exercise.routes";
import goalRouter from "./goal.router";
const allRouters = express.Router()

allRouters.get("/", (_: express.Request, res: express.Response) => {
    res.json({ message: "Hello World" })
})

allRouters.use("/exercises", exerciseRouter)

allRouters.use("/goals", goalRouter)


export default allRouters