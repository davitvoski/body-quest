import express from "express";
import { getUserGoals, saveUserGoalPOST } from "../controllers/goal.controller";
const goalRouter = express.Router()


/**
 * @swagger
 * /api/goals/:
 *  post:
 *   summary: Saves a goal to the database a user created.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email
 *        goal
 *      example:
 *       email: "test@gmail.com"
 *       goal: IGoal Type - check shared folder
 *   tags:
 *    - Goal
 *   description: Saves a goal to the database a user created by sending a email and a Goal throught the body.
 *   produces:
 *    - application/json
 *   responses:
 *    200:
 *     description: Successfully saved goal
 *    400:
 *     description: Email Or Goal not provided
 *    500:
 *     description: Error saving goal - server error
 */
goalRouter.post("/", saveUserGoalPOST)

/**
 * This function gets all goals from the database of a user.
 * Email should be passed through the body
 * @swagger
 * /api/goals/:
 *  get:
 *   summary: Get all goals
 *   description: Get all goals of a user via email
 *   tags:
 *    - Goal
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email
 *       example:
 *        email: "test@gmail.com"    
 *   responses:
 *    200:
 *     description: An array of goals
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        example: [
 *          {titel: string, exercise: string, reps?: number, sets?: number, weight?: number, completed: boolean, id: string}]
 *    400:
 *     description: Database error
 *    500:
 *     description: Server failed
 *          
 */
goalRouter.get("/", getUserGoals)


export default goalRouter