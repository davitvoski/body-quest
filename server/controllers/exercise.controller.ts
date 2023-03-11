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

/**
 * This function adds the favourited exercise to the users favourites.
 * @param req Express Request
 * @param res Express Response
 */
export async function favouriteExercisePOST(req: Request, res: Response) {
    try {
        // const email = req.session.user?.email as string
        const email = "dragonicefire21@gmail.com"
        const exerciseName = (req.body.exerciseName as string).toLocaleLowerCase()
        
        await new Database().favouriteExercise(email, exerciseName)
        res.status(201).send("Exercise favourited successfully")
    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).send(err.message)
        }
        res.status(500).send("Something went wrong")
    }
}

// /**
//  * This function gets the favourited exercises of the users
//  * @param req Express Request
//  * @param res Express Response
//  */
// export async function getFavourtieExercise(req: Request, res: Response) {
//     try {
        
//     } catch (err) {
//         if (err instanceof Error) {
//             return res.status(400).send(err.message)
//         }
//         res.status(500).send("Could not save the goal")
//     }
// }