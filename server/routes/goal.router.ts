import express from "express";
import { isAuthenticated } from "../controllers/auth.controller";
import { getUserGoals, saveUserGoalPOST, updateGoalCompletedPATCH } from "../controllers/goal.controller";

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
 *        goal
 *      example:
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
goalRouter.post("/", isAuthenticated, saveUserGoalPOST)

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
 *   responses:
 *    200:
 *     description: An array of goals
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        example:
 *         goal: [
 *          {startDate: 2023-04-1, endDate: 2023-05-01, exercise: string, reps?: number, sets?: number, weight?: number, completed: boolean, id: number}
 *           ]
 *    400:
 *     description: Database error
 *    500:
 *     description: Server failed
 *          
 */
goalRouter.get("/", isAuthenticated, getUserGoals)

// Generate swagger comments
/**
 * This function updates the goal completed to true.
 * @swagger
 * /api/goals/completed:
 *  patch:
 *   summary: Updates a goal to be completed
 *   description: Updates a goal to be completed
 *   tags:
 *    - Goal
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        goal
 *       example:
 *        goal: {startDate: 2023-04-1, endDate: 2023-05-01, exercise: string, reps?: number, sets?: number, weight?: number, completed: boolean, id: number}
*/
goalRouter.patch("/completed", isAuthenticated, updateGoalCompletedPATCH)


export default goalRouter