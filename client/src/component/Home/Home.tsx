import Toolbar from '@mui/material/Toolbar';
import { Search } from './Search';
import { useState, useEffect } from 'react';
import { ExerciseList } from '../Exercise/ExerciseList';
import { FilterView } from '../Filter/FilterView';
import { IExercise } from '../../../../shared';
import { useTranslation } from "react-i18next";
import HeaderLayout from './HeaderLayout';
import "../../styles/Home.css";
import { LinearProgress } from '@mui/material';
/** 
 * The main page of webiste
 * @returns Home Page
 */
const Home = () => {
  const { t } = useTranslation();
  const [allExercises, setAllExercise] = useState<IExercise[]>([]);
  const [exercises, setExercise] = useState<IExercise[]>(allExercises);

  /**
   * Fetch all exercises data from /api/exercises
   */
  async function fetchExercises() {
    const response = await fetch('/api/exercises', {
      method: 'GET',
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
  }, [])

  return (
    <div className='homePage'>
      <HeaderLayout />
      <div className='recommandtions'>

      </div>
      <h2>{t('workout')}</h2>
      <Toolbar className='searchBar'>
        <Search allExercises={allExercises} setExercise={setExercise} />
        <FilterView allExercises={allExercises} setExercise={setExercise} />
      </Toolbar>
      <div className='exercisesBox'>
        {exercises.length === 0 && <LinearProgress />}
        <ExerciseList exercises={exercises} />
      </div>
    </div>
  )
};


export default Home;