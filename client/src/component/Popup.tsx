import React, { useEffect, useState } from "react";
import "../styles/Popup.css";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  DialogContent,
  Typography,
  CardMedia,
  Card,
  Fade,
  Slide,
  Button,
} from "@mui/material";
import { Grow } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { StarBorder, StarOutline } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

export interface State extends SnackbarOrigin {
  openSnack: boolean;
}

export const Popup = (props: any) => {
  const { handleClose, open, exercise } = props;
  const [isFavourite, setIsFavourite] = useState(false);

  const [state, setState] = React.useState<State>({
    openSnack: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, openSnack } = state;

  const handleFavourite = (newState: SnackbarOrigin) => () => {
    // isFavourite
    //   ? window.alert("You Removed Favourite")
    //   : window.alert("You Added Favourite");
    setIsFavourite(!isFavourite);
    setState({ openSnack: true, ...newState });
  };

  const handleSnackClose = () => {
    setState({ ...state, openSnack: false });
  };
  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        TransitionComponent={Grow}
        keepMounted
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
          <img src={exercise.gif_url} style={{ width: 200 }} />
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
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openSnack}
        onClose={handleSnackClose}
        message="Added to Favourites!"
        key={vertical + horizontal}
      />
    </>
  );
};
