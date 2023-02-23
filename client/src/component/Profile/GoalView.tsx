import { Item } from "../modules/Item";

const tempGoals = [
    {
        "username": "john",
        "goal": "ankle circles",
        "reps": 20,
        "completed": false
    }, 
    {
        "username": "jane",
        "goal": "band bench press",
        "reps": 30,
        "completed": false
    }, 
    {
        "username": "doe",
        "goal": "dumbbell deadlift",
        "reps": 40,
        "completed": false
    }
]

export const GoalView = () => {
    return(
        <div>
            { tempGoals.map(goals => 
            <Item sx={{ m: "1% 0 1% 0"}}>

            </Item>) }
        </div>
    )
}