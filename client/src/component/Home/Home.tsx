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
import { Snackbar, SnackbarOrigin } from "@mui/material";
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
      <div className="recommandtions"></div>
      <h2 id="workout-otd">{t("workout")}</h2>
      <Toolbar className="searchBar">
        <Search allExercises={allExercises} setExercise={setExercise} />
        <FilterView allExercises={allExercises} setExercise={setExercise} />
      </Toolbar>
       
      <div className='exercisesBox'>
        {isLoading && <LinearProgress sx={{ width:"60%", margin:"5% auto 5% auto"}}/>}
        <ExerciseList exercises={exercises} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Home;
