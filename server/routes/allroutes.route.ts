import express from "express";
const router = express.Router()

router.use("/", (_: express.Request, res: express.Response) => {
    res.json({ message: "Hello World" })
})

export { router as allRoutes }