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
import CloseIcon from "@mui/icons-material/Close";
import { useMediaQuery as MQ } from "react-responsive";

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
export const GoalCompleted = (props: { xp: number; handleClose: () => void; open: boolean }) => {
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

  const isDesktopOrLaptop = MQ({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = MQ({ query: "(max-width: 1224px)" });

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
          <IconButton sx={{ justifyContent: "right" }} onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
          {isDesktopOrLaptop ? (
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
              {t("congratulations")}!
            </Typography>
          ) : (
            <Typography
              variant="h1"
              component="h2"
              color="primary.contrastText"
              sx={{
                textTransform: "uppercase",
                fontWeight: "900",
                fontSize: 30,
              }}
            >
              {t("congratulations")}!
            </Typography>
          )}
        </DialogTitle>
        <DialogContent sx={{ overflow: "auto" }} className="scrollbar-container">
          <div className="dialog-header">{t("you_gain")}</div>
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
            {props.xp}
          </Typography>
          <div className="dialog-header">{t("experience")}!</div>
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
