/**
 * @file Popup.tsx
 *
 * Popup component for displaying exercise information
 *
 * @author Santiago Luna
 */
import React, { useState } from "react";
import "../../styles/Popup.css";
import {
  DialogContent,
  Typography,
  DialogTitle,
  Dialog,
  Grow,
  IconButton,
  Snackbar,
  SnackbarOrigin,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { IExercise } from "../../../../shared";
import { GoalForm } from "./GoalForm";

type PopupProps = {
  handleClose: () => void;
  exercise: IExercise;
  open: boolean;
};

export interface State extends SnackbarOrigin {
  openSnack: boolean;
}

export const Popup = (props: PopupProps) => {
  const { handleClose, open, exercise } = props;
  const [openForm, setOpenForm] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  //Snack bar logic when adding to favourites
  const [snackState, setSnackState] = React.useState<State>({
    openSnack: false,
    vertical: "top",
    horizontal: "center",
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { vertical, horizontal, openSnack } = snackState;

  // Favorite functionality goes here
  const handleFavourite = (newState: SnackbarOrigin) => () => {
    setIsFavourite(!isFavourite);
    setSnackState({ openSnack: true, ...newState });
  };

  const handleSnackClose = () => {
    setSnackState({ ...snackState, openSnack: false });
  };
  // End of snack bar logic

  const handleForm = () => {
    setOpenForm(!openForm);
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        TransitionComponent={Grow}
        keepMounted
        className="dialog-container"
        fullScreen={fullScreen}
      >
        <DialogTitle>
          <Typography
            variant="h1"
            component="h2"
            sx={{
              textTransform: "uppercase",
              fontWeight: "900",
              fontSize: 50,
            }}
          >
            {exercise.name}
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{ overflow: "auto" }}
          className="scrollbar-container"
        >
          <div className="dialog-header">
            <div className="dialog-text-container">
              <Typography variant="h2" component="h2" sx={{ fontSize: 25 }}>
                <b>Equipment:</b> {exercise.equipment}
              </Typography>

              <Typography variant="h2" component="h2" sx={{ fontSize: 25 }}>
                <b>Body Part:</b> {exercise.body_part}
              </Typography>
              <Typography variant="h2" component="h2" sx={{ fontSize: 25 }}>
                <b>Target:</b> {exercise.target}
              </Typography>
            </div>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#000000",
                fontWeight: "bold",
                borderRadius: "10px",
                marginLeft: "5vw",
              }}
              onClick={handleForm}
            >
              CREATE GOAL
            </Button>
          </div>
          <div className="img-container">
            <img src={exercise.gifUrl} />
          </div>
          <div
            id="dialog-footer"
            style={{ display: "flex", justifyContent: "right" }}
          >
            {isFavourite ? (
              <IconButton
                sx={{ outline: "none" }}
                onClick={handleFavourite({
                  vertical: "bottom",
                  horizontal: "center",
                })}
              >
                <StarIcon htmlColor="#EFE2A2" />
              </IconButton>
            ) : (
              <IconButton
                sx={{ outline: "none" }}
                onClick={handleFavourite({
                  vertical: "bottom",
                  horizontal: "center",
                })}
              >
                <StarBorderIcon sx={{ outline: "none" }} />
              </IconButton>
            )}
          </div>
        </DialogContent>
      </Dialog>
      {isFavourite ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={openSnack}
          onClose={handleSnackClose}
          message="Added to Favourites!"
          key={vertical + horizontal}
        />
      ) : (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={openSnack}
          onClose={handleSnackClose}
          message="Removed From Favourites!"
          key={vertical + horizontal}
        />
      )}
      {openForm ? (
        <GoalForm
          handleClose={handleForm}
          open={openForm}
          exerciseName={exercise.name}
        />
      ) : null}
    </>
  );
};
