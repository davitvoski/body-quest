import { Button, Checkbox, Typography } from "@mui/material";
import Item from "../modules/Item";
import { useTranslation} from "react-i18next";
import { useEffect, useState } from "react";
import { IGoal } from "../../../../shared";

// const tempGoals = [
//     {
//         "name": "ankle circles",
//         "reps": 20,
//         "completed": false
//     }, 
//     {
//         "name": "band bench press",
//         "reps": 30,
//         "completed": true
//     }, 
//     {
//         "name": "dumbbell deadlift",
//         "reps": 40,
//         "completed": false
//     },
//     {
//         "name": "ankle circles",
//         "reps": 20,
//         "completed": true
//     }, 
//     {
//         "name": "band bench press",
//         "reps": 30,
//         "completed": false
//     }, 
//     {
//         "name": "dumbbell deadlift",
//         "reps": 40,
//         "completed": true
//     }
// ]

const GoalView = () => {
    const [goals, setGoals] = useState<IGoal[]>([]);
    const {t} = useTranslation();
    const isCompleted = (goal: any) => goal.completed;
    const isIncomplete = (goal: any) => !goal.completed;

    // Display Users Goals
    useEffect(() => {
      /**
       * This function gets a users goals
       */
      async function getGoals() {
        const resp = await fetch(`/api/goals`);
        // If not logged in, return
        if (resp.status === 401) return;
        const data = (await resp.json()).exercises as IGoal[];
  
        console.log(data)
      }
  
      // NOTE: IF THE GOALS ARE NOT DISPLAYING
      // IT MOST POSSIBLY MEANS THAT THE USER DOEST NOT HAVE ANY GOALS
      getGoals().catch((err) => {
        console.log(err);
      });
    }, []);

    return(
        <div>
            {goals.filter(isIncomplete).length > 0 ?
                goals.filter(isIncomplete).map(goal => 
                <Item sx={{ m: "1% 0 1% 0", p:2}}>
                    <Checkbox sx={{ color: "white"}} onChange={() => goal.completed = true} inputProps={{ 'aria-label': 'controlled' }} />
                    <Typography sx={{ m: "1% 0 1% 0" }} display="inline-block">{ goal.goal } reps: { goal.exercise }</Typography>
                </Item>
                ) :
                <Item sx={{ m: "1% 0 1% 0", p:2, textAlign: "center", opacity:"60%"}}>No current goals.</Item>
            }
            {goals.filter(isCompleted).length > 0 &&
                <Item sx={{ m: "1% 0 1% 0", p:2, textAlign: "center", opacity:"60%"}}>
                    COMPLETED GOALS
                </Item>
            }
            {goals.filter(isCompleted).length > 0 &&
                goals.filter(isCompleted).map(goal => 
                    <Item sx={{ m: "1% 0 1% 0", p:2, opacity:"60%"}}>
                        <Typography sx={{ m: "1% 0 1% 0" }} display="inline-block">{ goal.goal } reps: { goal.exercise }</Typography>
                        <Button>Do Again</Button>
                    </Item>
                )
            }
        </div>

    )
}

export default GoalView;