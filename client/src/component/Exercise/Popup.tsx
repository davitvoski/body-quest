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
import CloseIcon from "@mui/icons-material/Close";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { IExercise } from "../../../../shared";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { enqueueSnackbar, SnackbarProvider } from "notistack";

type PopupProps = {
  handleClose: () => void;
  exercise: IExercise;
  open: boolean;
  isLoggedIn: Boolean;
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Check if exercise is already a favourite
  useEffect(() => {
    async function checkFavourite() {
      const name = ensureNameIsHTTPParameterSafe(exercise.name);

      const resp = await fetch(`/api/exercises/favourites/${name}`);
      // If not logged in, return
      if (resp.status === 401) {
        setIsLoggedIn(false);
        return;
      }
      setIsLoggedIn(true);
      const data = (await resp.json()) as { isFavourite: boolean };
      if (data.isFavourite) setIsFavourite(true);
    }

    checkFavourite().catch((err) => {
      enqueueSnackbar(`${t('addTofavoris') as string }`, {
        variant: 'error'
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
      enqueueSnackbar(`${t('addTofavoris') as string }`, {
        variant: 'error'
      });
      return;
    }

    // If code other than in 200 range, return
    if (!resp.ok){
      enqueueSnackbar(`${t('popWrongMess') as string }`, {
        variant: "error"
      });
      return;
    } 

    setIsFavourite(!isFavourite);
    if (isFavourite) {
      enqueueSnackbar(`${t('removeFavoris') as string }`, {
        variant: "success"
      });
    }else {
      enqueueSnackbar(`${t('addedToFavourites') as string }`, {
        variant: "success"
      });
    }
  }

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
        <div className="dialog-header">
          <IconButton sx={{ justifyContent: "right" }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>

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
            {props.isLoggedIn && (
              <Link
                className="link-button"
                to={{
                  pathname: "/Goalcreation",
                }}
                state={{ exerciseName: exercise.name }}
              >
                {t("create_goal")}
              </Link>
            )}
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
                <StarIcon color="warning"/>
              ) : (
                <StarBorderIcon sx={{ outline: "none" }} />
              )}
            </IconButton>
          </div>
        </DialogContent>
      </Dialog>

      <SnackbarProvider 
        autoHideDuration={1000} 
        anchorOrigin={{vertical: "bottom", horizontal: "center"}}
        maxSnack={1}
      /> 
    </>
  );
};
