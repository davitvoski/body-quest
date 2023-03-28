export interface IExercise {
    _id: string;
    name: string;
    target: string;
    gifUrl: string;
    equipment: string;
    body_part: string;
}

export interface IUser {
    username: string,
    email: string,
    picture: string,
    goals: IGoal[],
    favourites: [string],
    isAdmin: boolean
}

export interface IGoal {
    id: number,
    exercise: string,
    type: string,
    goal: number
    startDate: string,
    endDate: string,
    completed: boolean = false,
}

export interface IUserPost {
    username: string,
    email: string,
    picture: string,
}

export interface IPostLikedUser {
    username: string,
    email: string,
}

export interface IPost {
    user: IUserPost,
    imageUrl: string,
    caption: string,
    date: string,
    likedUsers: IPostLikedUser[]
}