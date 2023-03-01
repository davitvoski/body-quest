import { Request, Response } from "express";
import { IGoal } from "../../shared";
import Database from "../database/db";


// /**
//  * This function gets all goals from the database for a user
//  * User is identified by email passed in the url as a parameter
//  * @param req Express Request
//  * @param res Express Response
//  */
// export async function getAllGoals(req: Request, res: Response) {
//     try {
//         const useremail = req.params.useremail
//         const goals = await new Database().getAllGoals(useremail)
//         res.json(goals)
//     } catch (err) {
//         res.status(400).json({ message: "Error getting all goals" })
//     }
// }

/**
 * This function saves a goal to the database for a user.
 * @param req Express Request
 * @param res Express Response
 */
export async function saveUserGoalPOST(req: Request, res: Response) {
    try {
        const email = req.body.email as string
        const goal = req.body.goal as IGoal
        if (!email || !goal) throw new Error("Email or goal not provided")

        const savedGoal = await new Database().saveUserGoal(email, goal)
        res.status(201).send("Goal saved successfully")
    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({ message: err.message })
        }
        res.status(500).send("Could not save the goal")
    }
}
