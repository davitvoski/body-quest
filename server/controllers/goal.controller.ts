import { Request, Response } from "express";
import { IGoal } from "../../shared";
import Database from "../database/db";

/**
 * This function saves a goal to the database for a user.
 * @param req Express Request
 * @param res Express Response
 */
export async function saveUserGoalPOST(req: Request, res: Response) {
  try {
    const email = req.session.user?.email as string;
    const goal = req.body.goal as IGoal;

    if (!goal) throw new Error("Goal not provided");

    await new Database().saveUserGoal(email, goal);

    res.status(201).send("Goal saved successfully");
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json(err.message);
    }
    res.status(500).send("Could not save the goal");
  }
}

/**
 * This function get all the goals for a user.
 * @param req Express Request
 * @param res Express Response
 */
export async function getUserGoals(req: Request, res: Response) {
  try {
    const email = req.session.user?.email as string;

    const goals = await new Database().getUserGoals(email);
    res.status(201).send(goals);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json(err.message);
    }
    res.status(500).send("Could not get the goals");
  }
}

/**
 * Tgis function updates a goal to be completed for a user.
 * @param req Express Request
 * @param res Express Response
 */
export async function updateGoalCompletedPATCH(req: Request, res: Response) {
  try {
    const goal = req.body.goal as IGoal;
    const email = req.session.user?.email as string;

    if (!goal) throw new Error("Goal not provided");

    if (goal.completed) return res.status(204).send("Goal already completed");

    await new Database().updateGoalCompleted(email, goal);

    res.status(201).send("Goal updated successfully");
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json(err.message);
    }
    res.status(500).send("Could not mark the goal completed");
  }
}
