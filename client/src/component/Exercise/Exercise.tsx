import { Card, CardContent, createTheme, Typography, useMediaQuery, useTheme } from "@mui/material";
import { IExercise } from "../../../../shared";
import { useState } from "react";
import { Popup } from "./Popup";
import "../../styles/Exercises.css";
import getDesignTokens from "../../Theme";
import { height } from "@mui/system";

type ExerciseProps = {
  exercise: IExercise;
};

/**
 * Info of one exercise
 * @param props ExerciseProps
 * @returns Exercise
 */
export const Exercise = (props: ExerciseProps) => {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const handlePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="exerciseArea" onClick={handlePopup}>
        <Card className="cardExecise" variant="outlined">
          <CardContent className="exerciseContent">
            <Typography className="exerciseNames">{props.exercise.name}</Typography>
            <div className="img-container">
              {props.exercise.body_part === "waist" &&
                (theme.palette.mode === "dark" ? (
                  <img width={90} loading="lazy" src="/body-parts/light-mode/waist-white.png" />
                ) : (
                  <img width={90} loading="lazy" src="/body-parts/dark-mode/waist.png" />
                ))}

              {props.exercise.body_part === "upper legs" &&
                (theme.palette.mode === "dark" ? (
                  <img width={90} loading="lazy" src="/body-parts/light-mode/upper-leg-white.png" />
                ) : (
                  <img width={90} loading="lazy" src="/body-parts/dark-mode/upper-leg.png" />
                ))}

              {props.exercise.body_part === "back" &&
                (theme.palette.mode === "dark" ? (
                  <img width={90} loading="lazy" src="/body-parts/light-mode/back-white.png" />
                ) : (
                  <img width={90} loading="lazy" src="/body-parts/dark-mode/back.png" />
                ))}

              {props.exercise.body_part === "lower legs" &&
                (theme.palette.mode === "dark" ? (
                  <img width={90} loading="lazy" src="/body-parts/light-mode/lower-leg-white.png" />
                ) : (
                  <img width={90} loading="lazy" src="/body-parts/dark-mode/lower-leg.png" />
                ))}

              {props.exercise.body_part === "chest" &&
                (theme.palette.mode === "dark" ? (
                  <img width={90} loading="lazy" src="/body-parts/light-mode/chest-white.png" />
                ) : (
                  <img width={90} loading="lazy" src="/body-parts/dark-mode/chest.png" />
                ))}

              {props.exercise.body_part === "upper arms" &&
                (theme.palette.mode === "dark" ? (
                  <img width={90} loading="lazy" src="/body-parts/light-mode/upper-arm-white.png" />
                ) : (
                  <img width={90} loading="lazy" src="/body-parts/dark-mode/upper-arm.png" />
                ))}

              {props.exercise.body_part === "cardio" &&
                (theme.palette.mode === "dark" ? (
                  <img width={90} loading="lazy" src="/body-parts/light-mode/cardio-white.png" />
                ) : (
                  <img width={90} loading="lazy" src="/body-parts/dark-mode/cardio.png" />
                ))}

              {props.exercise.body_part === "shoulders" &&
                (theme.palette.mode === "dark" ? (
                  <img width={90} loading="lazy" src="/body-parts/light-mode/shoulder-white.png" />
                ) : (
                  <img width={90} loading="lazy" src="/body-parts/dark-mode/shoulder.png" />
                ))}

              {props.exercise.body_part === "lower arms" &&
                (theme.palette.mode === "dark" ? (
                  <img width={90} loading="lazy" src="/body-parts/light-mode/lower-arm-white.png" />
                ) : (
                  <img width={90} loading="lazy" src="/body-parts/dark-mode/lower-arm.png" />
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {isOpen && <Popup handleClose={handlePopup} exercise={props.exercise} open={isOpen} />}
    </>
  );
};
