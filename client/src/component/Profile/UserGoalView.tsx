import { Button, Checkbox, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Item from "../modules/Item";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { IGoal } from "../../../../shared";

interface goalProps {
  userGoals: IGoal[];
}

const UserGoalView = (props: goalProps) => {
  const { t } = useTranslation();
  const isCompleted = (goal: any) => goal.completed;
  const isIncomplete = (goal: any) => !goal.completed;

  return (
    <div>
      {props.userGoals.filter(isIncomplete).length > 0 ? (
        props.userGoals.filter(isIncomplete).map((goal) => (
          <Item sx={{ m: "1% 0 1% 0", p: 2 }}>
            <Typography
              sx={{ m: "0% 0 -2% 0" }}
              display="block"
              variant="caption"
              color="primary"
              align="right"
            >
              {goal.startDate} - {goal.endDate}
            </Typography>
            <Typography sx={{ m: "1% 0 1% 0" }} display="inline-block">
              {goal.goal} {goal.type}: {goal.exercise}
            </Typography>
          </Item>
        ))
      ) : (
        <Item
          sx={{ m: "1% 0 1% 0", p: 2, textAlign: "center", opacity: "60%" }}
        >
          {t("no_current_goals")}
        </Item>
      )}
      {props.userGoals.filter(isCompleted).length > 0 && (
        <Item
          sx={{ m: "1% 0 1% 0", p: 2, textAlign: "center", opacity: "60%" }}
        >
          {t("completed_goals")}
        </Item>
      )}
      {props.userGoals.filter(isCompleted).length > 0 &&
        props.userGoals.filter(isCompleted).map((goal) => (
          <Item sx={{ m: "1% 0 1% 0", p: 2, opacity: "60%" }}>
            <Typography
              sx={{ m: "0% 0 -2% 0" }}
              display="block"
              variant="caption"
              color="primary"
              align="right"
            >
              {goal.startDate} - {goal.endDate}
            </Typography>
            <Typography sx={{ m: "1% 0 1% 0" }} display="inline-block">
              {goal.goal} {goal.type}: {goal.exercise}
            </Typography>
          </Item>
        ))}
    </div>
  );
};

export default UserGoalView;
