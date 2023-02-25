import express from "express";
import exerciseRouter from "./exercise.routes";
const allRouters = express.Router()

allRouters.get("/", (_: express.Request, res: express.Response) => {
    res.json({ message: "Hello World" })
})

allRouters.use(exerciseRouter)

export default allRouters