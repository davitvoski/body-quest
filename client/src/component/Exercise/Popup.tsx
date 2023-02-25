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
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { IExercise } from "../../../../shared";

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
  const [isFavourite, setIsFavourite] = useState(false);
  //Snack bar logic when adding to favourites
  const [snackState, setSnackState] = React.useState<State>({
    openSnack: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, openSnack } = snackState;

  const handleFavourite = (newState: SnackbarOrigin) => () => {
    setIsFavourite(!isFavourite);
    setSnackState({ openSnack: true, ...newState });
  };

  const handleSnackClose = () => {
    setSnackState({ ...snackState, openSnack: false });
  };
  // End of snack bar logic

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        TransitionComponent={Grow}
        keepMounted
        className="dialog-container"
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
          <Typography variant="h2" component="h2" sx={{ fontSize: 25 }}>
            <b>Equipment:</b> {exercise.equipment}
          </Typography>

          <Typography variant="h2" component="h2" sx={{ fontSize: 25 }}>
            <b>Body Part:</b> {exercise.body_part}
          </Typography>
          <Typography variant="h2" component="h2" sx={{ fontSize: 25 }}>
            <b>Target:</b> {exercise.target}
          </Typography>
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
    </>
  );
};
