import { IGoal, IUser } from "../../shared";
import "express-session"

export type GetGoalsReturnValue = {
    goals: IGoal[];
}

// declare module 'express-session' {
//     export interface SessionData {
//         user: IUser;
//     }
// }

// export { }