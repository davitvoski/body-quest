import { Button, Checkbox, Typography } from "@mui/material";
import Item from "../modules/Item";
import { useTranslation} from "react-i18next";

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

const GoalView = () => {
    const {t} = useTranslation();
    const isCompleted = (goal: any) => goal.completed;
    const isIncomplete = (goal: any) => !goal.completed;

    return(
        <div>
            {tempGoals.filter(isIncomplete).length > 0 ?
                tempGoals.filter(isIncomplete).map(goal => 
                <Item sx={{ m: "1% 0 1% 0", p:2}}>
                    <Checkbox sx={{ color: "white"}} onChange={() => goal.completed = true} inputProps={{ 'aria-label': 'controlled' }} />
                    <Typography sx={{ m: "1% 0 1% 0" }} display="inline-block">{ goal.reps } reps: { goal.name }</Typography>
                </Item>
                ) :
                <Item sx={{ m: "1% 0 1% 0", p:2, textAlign: "center"}}>No current goals.</Item>
            }
            <Item sx={{ m: "1% 0 1% 0", p:2, textAlign: "center", opacity:"60%"}}>
                COMPLETED GOALS
            </Item>
            {tempGoals.filter(isCompleted).length > 0 ? 
                tempGoals.filter(isCompleted).map(goal => 
                    <Item sx={{ m: "1% 0 1% 0", p:2, opacity:"60%"}}>
                        <Typography sx={{ m: "1% 0 1% 0" }} display="inline-block">{ goal.reps } reps: { goal.name }</Typography>
                        <Button>Do Again</Button>
                    </Item>
                ) :
                <Item sx={{ m: "1% 0 1% 0", p:2, textAlign: "center", opacity:"60%"}}>No completed goals.</Item>
            }
        </div>

    )
}

export default GoalView;