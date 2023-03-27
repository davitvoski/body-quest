import { Request, Response } from "express";
import Database from "../database/db";

/**
 * This controller gets all exercises from the database
 * It can be limited by a query parameter limit
 * @param req Express Request
 * @param res Express Response
 */
export async function getAllExercises(req: Request, res: Response) {
  try {
    const limit = req.query.limit as string;
    const exercises = await new Database().getAllExercises(limit);
    res.json(exercises);
  } catch (err) {
    res.status(400).json({ message: "Error getting all exercises" });
  }
}

/**
 * This controller adds the favourited exercise to the users favourites.
 * @param req Express Request
 * @param res Express Response
 */
export async function favouriteExercisePOST(req: Request, res: Response) {
  try {
    const email = req.session.user!.email as string;
    const exerciseName = (req.body.exerciseName as string).toLocaleLowerCase();

    await new Database().favouriteExercise(email, exerciseName);
    res.status(200).send("Exercise favourited successfully");
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    }
    res.status(500).send("Something went wrong");
  }
}

/**
 *  This controller controls the /api/exercises/favourites/:name DELETE endpoint.
 *  It removes the exercise from the users favourites.
 * @param req Express Request
 * @param res Express Response
 */
export async function favouriteExerciseDELETE(req: Request, res: Response) {
  try {
    const email = req.session.user!.email as string;
    const exerciseName = (req.params.name as string).toLocaleLowerCase();

    await new Database().unfavouriteExercise(email, exerciseName);
    res.status(204).send("Exercise unfavourited successfully");
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    }
    res.status(500).send("Something went wrong");
  }
}

/**
 * This controller checks if the exercise is favourited by the user
 * @param req Express Request
 * @param res Express Response
 */
export async function getFavourtieExerciseByName(req: Request, res: Response) {
  try {
    const email = req.session.user!.email as string;
    const exerciseName = (req.params.name as string).toLocaleLowerCase();
    const resp = await new Database().isExerciseFavourited(email, exerciseName);

    res.status(200).json({ isFavourite: resp });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    }
    res.status(500).send("Something went wrong");
  }
}

/**
 * This function gets the favourited exercises of the users
 * @param req Express Request
 * @param res Express Response
 */
export async function getAllFavouriteExercises(req: Request, res: Response) {
  try {
    const email = req.session.user!.email as string;

    const exercises = await new Database().getFavouriteExercises(email);

    res.json({ exercises: exercises });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    }
    res.status(500).send("Could not save the goal");
  }
}

/**
 * This function gets the favourited exercises of a specific user
 * @param req Express Request
 * @param res Express Response
 */
export async function getSpecificUserFavouriteExercises(
  req: Request,
  res: Response
) {
  try {
    const email = req.body.email;

    const exercises = await new Database().getFavouriteExercises(email);

    res.json({ exercises: exercises });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    }
    res.status(500).send("Could not get the exercises");
  }
}
