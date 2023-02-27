import { Card, CardContent, Typography } from "@mui/material";
import { IExercise } from "../../../../shared";
import { useState } from "react";
import { Popup } from "./Popup";

type ExerciseProps = {
  exercise: IExercise;
};
export const Exercise = (props: ExerciseProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="exerciseArea" onClick={handlePopup}>
        <Card className="cardExecise" variant="outlined">
          <CardContent className="exerciseContent">
            <Typography className="exerciseNames">
              {props.exercise.name}
            </Typography>
            <Typography>{props.exercise.body_part}</Typography>
          </CardContent>
        </Card>
      </div>
      {isOpen && (
        <Popup
          handleClose={handlePopup}
          exercise={props.exercise}
          open={isOpen}
        />
      )}
    </>
  );
};
