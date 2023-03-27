import { Card, CardContent, createTheme, Typography, useMediaQuery, useTheme } from "@mui/material";
import { IExercise } from "../../../../shared";
import { useState } from "react";
import { Popup } from "./Popup";
import "../../styles/Exercises.css";

type ExerciseProps = {
  exercise: IExercise;
  isLoggedIn: Boolean;
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
        <Card className="cardExecise" variant="outlined" sx={{ height: "14em" }}>
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
                  <img width={120} loading="lazy" src="/body-parts/light-mode/back-white.png" />
                ) : (
                  <img width={120} loading="lazy" src="/body-parts/dark-mode/back.png" />
                ))}

              {props.exercise.body_part === "lower legs" &&
                (theme.palette.mode === "dark" ? (
                  <img width={90} loading="lazy" src="/body-parts/light-mode/lower-leg-white.png" />
                ) : (
                  <img width={90} loading="lazy" src="/body-parts/dark-mode/lower-leg.png" />
                ))}

              {props.exercise.body_part === "chest" &&
                (theme.palette.mode === "dark" ? (
                  <img width={110} loading="lazy" src="/body-parts/light-mode/chest-white.png" />
                ) : (
                  <img width={110} loading="lazy" src="/body-parts/dark-mode/chest.png" />
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

              {props.exercise.body_part === "neck" &&
                (theme.palette.mode === "dark" ? (
                  <img width={90} loading="lazy" src="/body-parts/light-mode/neck-white.png" />
                ) : (
                  <img width={90} loading="lazy" src="/body-parts/dark-mode/neck.png" />
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {isOpen && <Popup isLoggedIn={props.isLoggedIn} handleClose={handlePopup} exercise={props.exercise} open={isOpen} />}
    </>
  );
};
