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

  const renderImage = (bodyPart: string) => {
    let src = "/body-parts/"
    switch(bodyPart) {
      case "waist" : src += "waist.png"; break;
      case "upper legs" : src += "upper-leg.png"; break;
      case "back" : src += "back.png"; break;
      case "lower legs" : src += "lower-leg.png"; break;
      case "chest" : src += "chest.png"; break;
      case "upper arms" : src += "upper-arm.png"; break;
      case "cardio" : src += "cardio.png"; break;
      case "shoulders" : src += "shoulder.png"; break;
      case "lower arms" : src += "lower-arm.png"; break;
      case "neck" : src += "neck.png"; break;
    }
    
    return ( <img width={90} loading="lazy" src={ src } className="exerciseIcon" alt={bodyPart} /> )
  }

  return (
    <>
      <button className="exerciseArea" onClick={handlePopup} tabIndex={0}>
        <Card className="cardExecise" sx={{ height: "14em", borderRadius: 0, backgroundColor: "background.cards" }}>
          <CardContent className="exerciseContent">
            <Typography className="exerciseNames">{props.exercise.name}</Typography>
            <div className="img-container">
              { renderImage(props.exercise.body_part) }
            </div>
          </CardContent>
        </Card>
      </button>
      {isOpen && <Popup isLoggedIn={props.isLoggedIn} handleClose={handlePopup} exercise={props.exercise} open={isOpen} />}
    </>
  );
};
