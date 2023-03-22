import React, { useEffect, useState } from "react";
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
  Alert,
} from "@mui/material";
import { IExercise } from "../../../../shared";
import { useTranslation } from "react-i18next";

type PopupProps = {
  handleClose: () => void;
  exercise: IExercise;
  open: boolean;
};

interface State extends SnackbarOrigin {
  openSnack: boolean;
}

/**
 * @file Popup.tsx
 *
 * Popup component for displaying exercise information
 * Allows the ability to favourite an exercise and create a goal
 *
 * @author Santiago Luna, Davit Voskerchyan
 */
export const GoalCompleted = (props: {xp: number, handleClose: () => void, open: boolean}) => {
  const { t } = useTranslation();
  const [errorHandling, setErrorHandling] = useState({
    isError: false,
    message: "",
  });

  //Snack bar logic when adding to favourites
  const [snackState, setSnackState] = React.useState<State>({
    openSnack: false,
    vertical: "top",
    horizontal: "center",
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { vertical, horizontal, openSnack } = snackState;

  /**
   * This function handles the closing of the snack bar.
   */
  const handleSnackClose = () => {
    setSnackState({ ...snackState, openSnack: false });
  };

  return (
    <>
      <Dialog
        onClose={props.handleClose}
        open={props.open}
        TransitionComponent={Grow}
        keepMounted
        className="dialog-container"
        fullScreen={fullScreen}
      >
        <DialogTitle>
          <Typography
            variant="h1"
            component="h2"
            color="primary.contrastText"
            sx={{
              textTransform: "uppercase",
              fontWeight: "900",
              fontSize: 50,
            }}
          >
            title
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{ overflow: "auto" }}
          className="scrollbar-container"
        >
          <div className="dialog-header">
            header
          </div>
          <div className="img-container">
            image
          </div>
          <div
            id="dialog-footer"
            style={{ display: "flex", justifyContent: "right" }}
          >
            footer
          </div>
        </DialogContent>
      </Dialog>

      {errorHandling.isError && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={errorHandling.isError}
          onClose={handleSnackClose}
          message={errorHandling.message}
        />
      )}
    </>
  );
};
