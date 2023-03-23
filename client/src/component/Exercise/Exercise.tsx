import { Card, CardContent, Typography } from "@mui/material";
import { IExercise } from "../../../../shared";
import { useState } from "react";
import { Popup } from "./Popup";
import "../../styles/Exercises.css";

type ExerciseProps = {
  exercise: IExercise;
};

/**
 * Info of one exercise
 * @param props ExerciseProps
 * @returns Exercise
 */
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
            <div className="img-container">
              {props.exercise.body_part === "waist" && (
                <img width={90} loading="lazy" src="/body-parts/waist.png" />
              )}
              {props.exercise.body_part === "upper legs" && (
                <img width={90} loading="lazy" src="/body-parts/thigh.png" />
              )}
              {props.exercise.body_part === "back" && (
                <img width={90} loading="lazy" src="/body-parts/back.png" />
              )}
            </div>
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
