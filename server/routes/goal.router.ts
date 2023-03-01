import express, { Request, Response } from "express";
import { saveUserGoalPOST } from "../controllers/goal.controller";
const goalRouter = express.Router()


goalRouter.post("/", saveUserGoalPOST)

export default goalRouter