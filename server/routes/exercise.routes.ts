import express from "express";
import { isAuthenticated } from "../controllers/auth.controller";
import { favouriteExercisePOST, getAllExercises } from "../controllers/exercise.controller";
const exerciseRouter = express.Router()

/**
 * This function gets all exercises from the database
 * It can be limited by a query parameter limit
 * @swagger
 * /api/exercises/:
 *  get:
 *      summary: Get all exercises
 *      description: Get all exercises
 *      tags:
 *          - Exercises
 *      parameters:
 *          - in: query
 *            name: limit
 *            schema:
 *              type: string
 *            description: The number of exercises to return
 *      responses:
 *          200:
 *              description: An array of exercises
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *          400:
 *              description: Error getting all exercises
 */
exerciseRouter.get("/", getAllExercises)


exerciseRouter.post("/favourites", favouriteExercisePOST)

// exerciseRouter.get("/favourites", isAuthenticated,)

export default exerciseRouter