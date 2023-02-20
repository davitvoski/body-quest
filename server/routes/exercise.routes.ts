import express, { Request, Response } from "express";
import { getAllExercises } from "../controllers/exercise.controller";
const exerciseRouter = express.Router()

exerciseRouter.get("/exercises", getAllExercises)

export default exerciseRouter