export interface IExercise {
  _id: string;
  name: string;
  target: string;
  gifUrl: string;
  equipment: string;
  body_part: string;
}

// TODO: To be designed
export interface IUser {
  username: string;
  email: string;
  picture: string;
  goals: IGoal[];
}

export interface IGoal {
  exercise: string;
  reps?: number;
  time?: number;
  // In KG
  weight?: number;
  startDate: string;
  endDate: string;
  completed: boolean = false;
}
