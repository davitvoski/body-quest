import { IGoal, IUser } from "../../shared";
import "express-session"

export type GetGoalsReturnValue = {
    goals: IGoal[];
}