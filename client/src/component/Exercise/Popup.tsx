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
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { IExercise } from "../../../../shared";
import { Link } from "react-router-dom";
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
 * This function ensures that the exercise name is HTTP safe
 * Meaning that when passed through the URL, it is not interpreted as a path
 * @param name The string to check if it is HTTP safe
 * @returns
 */
function ensureNameIsHTTPParameterSafe(name: string) {
  return name.replace("/", "%2F");
}

/**
 * @file Popup.tsx
 *
 * Popup component for displaying exercise information
 * Allows the ability to favourite an exercise and create a goal
 *
 * @author Santiago Luna, Davit Voskerchyan
 */
export const Popup = (props: PopupProps) => {
  const { t } = useTranslation();
  const { handleClose, open, exercise } = props;
  const [isFavourite, setIsFavourite] = useState(false);
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

  // Check if exercise is already a favourite
  useEffect(() => {
    async function checkFavourite() {
      const name = ensureNameIsHTTPParameterSafe(exercise.name);

      const resp = await fetch(`/api/exercises/favourites/${name}`);
      // If not logged in, return
      if (resp.status === 401) return;
      const data = (await resp.json()) as { isFavourite: boolean };
      if (data.isFavourite) setIsFavourite(true);
    }

    checkFavourite().catch((err) => {
      setErrorHandling({
        isError: true,
        message: `${t('uncheckFavourites') as string | undefined}`,
      });
    });
  }, []);

  /**
   * This function handles the favouriting/unfavouriting of an exercise.
   */
  async function handleFavourite() {
    let resp;
    if (!isFavourite) {
      resp = await fetch("/api/exercises/favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exerciseName: exercise.name,
        }),
      });
    } else {
      const name = ensureNameIsHTTPParameterSafe(exercise.name);
      resp = await fetch(`/api/exercises/favourites/${name}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Handle unathorized
    if (resp.status === 401) {
      setErrorHandling({
        isError: true,
        // message: "You must be logged in to favourite an exercise.",
        message:`${t('addTofavoris') as string | undefined}`,
      });
      return;
    }

    // If code other than in 200 range, return
    if (!resp.ok)
      setErrorHandling({
        isError: true,
        message:`${t('popWrongMess') as string | undefined}`,
      });

    // Change states
    setErrorHandling({ isError: false, message: "" });
    setIsFavourite(!isFavourite);
    setSnackState({
      ...snackState,
      openSnack: true,
      vertical: "bottom",
      horizontal: "center",
    });
  }

  /**
   * This function handles the closing of the snack bar.
   */
  const handleSnackClose = () => {
    setSnackState({ ...snackState, openSnack: false });
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
            color="primary.contrastText"
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
                <b>{t("equipement")}:</b> {exercise.equipment}
              </Typography>

              <Typography variant="h2" component="h2" sx={{ fontSize: 25 }}>
                <b>{t("body_part")}:</b> {exercise.body_part}
              </Typography>
              <Typography variant="h2" component="h2" sx={{ fontSize: 25 }}>
                <b>{t("target")}:</b> {exercise.target}
              </Typography>
            </div>
            <Link
              className="link-button"
              to={{
                pathname: "/Goalcreation",
              }}
              state={{ exerciseName: exercise.name }}
              // onClick={handleForm}
            >
              {t("create_goal")}
            </Link>
          </div>
          <div className="img-container">
            <img src={exercise.gifUrl} />
          </div>
          <div
            id="dialog-footer"
            style={{ display: "flex", justifyContent: "right" }}
          >
            <IconButton sx={{ outline: "none" }} onClick={handleFavourite}>
              {isFavourite ? (
                <StarIcon htmlColor="#EFE2A2" />
              ) : (
                <StarBorderIcon sx={{ outline: "none" }} />
              )}
            </IconButton>
          </div>
        </DialogContent>
      </Dialog>

      {isFavourite ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={openSnack}
          onClose={handleSnackClose}
          message= {t('addedToFavourites') as string | undefined}
          key={vertical + horizontal}
        />
      ) : (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={openSnack}
          onClose={handleSnackClose}
          message={t('removeFavoris') as string | undefined}
          key={vertical + horizontal}
        />
      )}

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
