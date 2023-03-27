import { Button, Checkbox, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Item from "../modules/Item";
import { useTranslation} from "react-i18next";
import { useEffect, useState } from "react";
import { IGoal } from "../../../../shared";

interface goalProps {
    completeGoal: (goal: number, type: string) => void
}

const GoalView = (props: goalProps) => {
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
        const data = await resp.json() as IGoal[];
  
        setGoals(data)
      }
  
      // NOTE: IF THE GOALS ARE NOT DISPLAYING
      // IT MOST POSSIBLY MEANS THAT THE USER DOEST NOT HAVE ANY GOALS
      getGoals().catch((err) => {
        console.log(err);
      });
    }, []);

    const completeGoal = async (goal: IGoal) => {
        let resp;
        resp = await fetch("/api/goals/completed", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({goal: goal}),
        });

        let newgoals = goals
        newgoals.find(g => g.id == goal.id)!.completed = true
        setGoals(newgoals)

        props.completeGoal(goal.goal, goal.type)
    }

    return(
        <div>
            {goals.filter(isIncomplete).length > 0 ?
                goals.filter(isIncomplete).map(goal => 
                <Item sx={{ m: "0% 0 1% 0", p:2}}>
                    <Typography sx={{ m: "0% 0 -2% 0" }} display="block" variant="caption" color="primary" align="right">{ goal.startDate } - { goal.endDate }</Typography>
                    <Checkbox sx={{ color: "white"}} onChange={() => completeGoal(goal)} inputProps={{ 'aria-label': 'controlled' }} />
                    <Typography sx={{ m: "1% 0 1% 0" }} display="inline-block">{ goal.goal } { goal.type }: { goal.exercise }</Typography>
                </Item>
                ) :
                <Item sx={{ m: "0% 0 1% 0", p:2, textAlign: "center", opacity:"60%"}}>No current goals.</Item>
            }
            {goals.filter(isCompleted).length > 0 &&
                <Item sx={{ m: "0% 0 1% 0", p:2, textAlign: "center", opacity:"60%", fontFamily: "Silkscreen", fontSize: 20 }}>
                    COMPLETED GOALS
                </Item>
            }
            {goals.filter(isCompleted).length > 0 &&
                goals.filter(isCompleted).map(goal => 
                    <Item sx={{ m: "0% 0 1% 0", p:2, opacity:"60%"}}>
                        <Typography sx={{ m: "0% 0 -2% 0" }} display="block" variant="caption" color="primary" align="right">{ goal.startDate } - { goal.endDate }</Typography>
                        <Typography sx={{ m: "1% 0 1% 0" }} display="inline-block">{ goal.goal } { goal.type }: { goal.exercise }</Typography>
                        <Link
                            to={{
                                pathname: "/Goalcreation",
                            }}
                            state={{ exerciseName: goal.exercise,  type: goal.type }}
                        >
                            <Button>Do Again</Button>
                        </Link>
                    </Item>
                )
            }
        </div>

    )
}

export default GoalView;