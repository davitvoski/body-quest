import Toolbar from "@mui/material/Toolbar";
import { Search } from "./Search";
import { useState, useEffect } from "react";
import { ExerciseList } from "../Exercise/ExerciseList";
import { FilterView } from "../Filter/FilterView";
import { IExercise } from "../../../../shared";
import { useTranslation } from "react-i18next";
import HeaderLayout from "./HeaderLayout";
import LinearProgress from "@mui/material/LinearProgress";
import "../../styles/Home.css";
import { useLocation } from "react-router";
import { Box, Grid, Snackbar, SnackbarOrigin } from "@mui/material";
import React from "react";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

interface State extends SnackbarOrigin {
  openSnack: boolean;
}

/**
 * The main page of webiste
 * @returns Home Page
 */
const Home = () => {
  const { t } = useTranslation();
  const [allExercises, setAllExercise] = useState<IExercise[]>([]);
  const [exercises, setExercise] = useState<IExercise[]>(allExercises);
  const [isLoading, setIsloading] = useState(false);
  const { state } = useLocation();

  /**
   * Fetch all exercises data from /api/exercises
   */
  async function fetchExercises() {
    const response = await fetch("/api/exercises", {
      method: "GET",
    });
    if (response.status === 404) {
      throw new Error(
        `Failed to fetch ${response.status}: ${response.statusText}`
      );
    }
    const jsonData = (await response.json()) as IExercise[];
    setIsloading(false);
    setAllExercise(jsonData);
    setExercise(jsonData);
  }

  useEffect(() => {
    setIsloading(true);
    fetchExercises();
    if (state?.goalCreated) {
      goalCreationPopup();
    }
  }, []);

  const goalCreationPopup = () => {
    enqueueSnackbar("Goal Created", {
      autoHideDuration: 2000,
      preventDuplicate: true,
    });
  };

  return (
    <div className="homePage">
      <SnackbarProvider autoHideDuration={2000} maxSnack={1} preventDuplicate />

      <HeaderLayout />
      <Box width="100%" height="5rem" sx={{ backgroundColor: "background.banner"}} display="flex" flexDirection={"row"} justifyContent="center" alignItems="center">
        <Grid container justifyContent="center" alignItems="center" paddingLeft={"15%"} paddingRight={"15%"}>
          <Grid item xs={3}><Search allExercises={allExercises} setExercise={setExercise} /></Grid>
          <Grid item xs={6}><h2 id="workout-otd">{t("workout")}</h2></Grid>
          <Grid item xs={3}><FilterView allExercises={allExercises} setExercise={setExercise} /></Grid>
        </Grid>
      </Box>
      <div className="content profile">
        <div className='exercisesBox'>
          {isLoading && <LinearProgress sx={{ width:"60%", margin:"3% auto 3% auto"}}/>}
          <ExerciseList exercises={exercises} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Home;
