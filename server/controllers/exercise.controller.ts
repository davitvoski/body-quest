import { Request, Response } from "express";
import Database from "../database/db";


/**
 * This function gets all exercises from the database
 * It can be limited by a query parameter limit
 * @param req Express Request
 * @param res Express Response
 */
export async function getAllExercises(req: Request, res: Response) {
    try {
        const limit = req.query.limit as string
        const exercises = await new Database().getAllExercises(limit)
        res.json(exercises)
    } catch (err) {
        res.status(400).json({ message: "Error getting all exercises" })
    }
}
