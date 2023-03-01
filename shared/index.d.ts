export interface IExercise {
    _id: string,
    name: string,
    target: string,
    gifUrl: string,
    equipment: string,
    body_part: string,
}

export interface IUser {
    username: string,
    email: string,
    avatar: string,
    goals: IGoal[],
}

//TODO: Talk to @santigao and @sophia about this
export interface IGoal {
    title: string,
    // TODO: Think if a string would be more appropriate
    exercise: IExercise,
    reps: number,
    sets?: number,
    // In KG
    weight?: number,
    completed: false
}