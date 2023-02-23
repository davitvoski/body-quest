import { Checkbox } from "@mui/material";
import { Item } from "../modules/Item";

const tempGoals = [
    {
        "name": "ankle circles",
        "reps": 20,
        "completed": false
    }, 
    {
        "name": "band bench press",
        "reps": 30,
        "completed": true
    }, 
    {
        "name": "dumbbell deadlift",
        "reps": 40,
        "completed": false
    },
    {
        "name": "ankle circles",
        "reps": 20,
        "completed": true
    }, 
    {
        "name": "band bench press",
        "reps": 30,
        "completed": false
    }, 
    {
        "name": "dumbbell deadlift",
        "reps": 40,
        "completed": true
    }
]

export const GoalView = () => {
    const isCompleted = (goal: any) => goal.completed;
    const isIncomplete = (goal: any) => !goal.completed;

    return(
        <div>
            { tempGoals.filter(isIncomplete).map(goal => 
                <Item sx={{ m: "1% 0 1% 0", p:2}}>
                    <Checkbox sx={{ color: "white"}} onChange={() => goal.completed = true} inputProps={{ 'aria-label': 'controlled' }} />
                    { goal.reps } reps: { goal.name }
                </Item>
            )}
            { tempGoals.filter(isCompleted).map(goal => 
                <Item sx={{ m: "1% 0 1% 0", p:2, color: "text.disabled"}}>
                    <Checkbox sx={{ color: "white"}} disabled checked />
                    { goal.reps } reps: { goal.name }
                </Item>
            )}
        </div>
    )
}

function setChecked(checked: boolean) {
    throw new Error("Function not implemented.");
}
