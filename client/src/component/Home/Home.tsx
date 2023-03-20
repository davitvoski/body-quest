import Toolbar from '@mui/material/Toolbar';
import { Search } from './Search';
import { useState, useEffect } from 'react';
import { ExerciseList } from '../Exercise/ExerciseList';
import { FilterView } from '../Filter/FilterView';
import { IExercise } from '../../../../shared';
import { useTranslation } from "react-i18next";
import HeaderLayout from './HeaderLayout';
import LinearProgress from '@mui/material/LinearProgress';
import "../../styles/Home.css";
/** 
 * The main page of webiste
 * @returns Home Page
 */
const Home = () => {
  const { t } = useTranslation();
  const [allExercises, setAllExercise] = useState<IExercise[]>([]);
  const [exercises, setExercise] = useState<IExercise[]>(allExercises);
  const [isLoading, setIsloading] = useState(false);

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
    setIsloading(false);
    setAllExercise(jsonData);
    setExercise(jsonData);
  }

  useEffect(() => {
    setIsloading(true);
    fetchExercises();
  }, [])

  return (
    <div className='homePage'>
      <HeaderLayout />
      <div className='recommandtions'>

      </div>
      <h2 id="workout-otd">{t('workout')}</h2>
      <Toolbar className='searchBar'>
        <Search allExercises={allExercises} setExercise={setExercise} />
        <FilterView allExercises={allExercises} setExercise={setExercise} />
      </Toolbar>

      <div className='exercisesBox'>
        {isLoading && <LinearProgress sx={{ width: "60%", marginBottom:'50px'}} />}
        <ExerciseList exercises={exercises} isLoading={isLoading}/>
      </div>
    </div>
  )
};


export default Home;