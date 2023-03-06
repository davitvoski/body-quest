import express, { Request, Response } from "express";
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

goalRouter.get("/", getUserGoals)


export default goalRouter