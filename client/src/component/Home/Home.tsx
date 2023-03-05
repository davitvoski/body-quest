import Toolbar from "@mui/material/Toolbar";
import { Search } from "./Search";
import { useState, useEffect } from "react";
import { ExerciseList } from "../Exercise/ExerciseList";
import { FilterView } from "../Filter/FilterView";
import { IExercise } from "../../../../shared";

export const Home = () => {
  const [allExercises, setAllExercise] = useState<IExercise[]>([]);
  const [exercises, setExercise] = useState<IExercise[]>(allExercises);

  async function fetchExercises() {
    const response = await fetch("/api/exercises/", {
      method: "GET",
    });

    if (response.status === 404) {
      throw new Error(
        `Failed to fetch ${response.status}: ${response.statusText}`
      );
    }

    const jsonData = (await response.json()) as IExercise[];
    setAllExercise(jsonData);
    setExercise(jsonData);
  }

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <div className="homePage">
      <h2>WORKOUT OF THE DAY</h2>
      <Toolbar className="searchBar">
        <Search allExercises={allExercises} setExercise={setExercise} />
        <FilterView allExercises={allExercises} setExercise={setExercise} />
      </Toolbar>
      <div className="exercisesBox">
        <ExerciseList exercises={exercises} />
      </div>
    </div>
  );
};
