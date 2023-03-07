import Toolbar from '@mui/material/Toolbar';
import { Search } from './Search';
import { useState, useEffect } from 'react';
import { ExerciseList } from '../Exercise/ExerciseList';
import { FilterView } from '../Filter/FilterView';
import { IExercise } from '../../../../shared';
import { useTranslation } from "react-i18next";
import { exercisesData } from '../../Data/testData';

const Home = () => {
  const { t } = useTranslation();
  const [allExercises, setAllExercise] = useState<IExercise[]>([]);
  const [exercises, setExercise] = useState<IExercise[]>(allExercises);

  async function fetchExercises() {
    const response = await fetch('/api/exercises', {
      method: 'GET',
    });
    if (response.status === 404) {
      throw new Error(
        `Failed to fetch ${response.status}: ${response.statusText}`
      );
    }
  }
    useEffect(() => {
      //fetchExercises();
      // test data, will delete after
      setAllExercise(exercisesData);
      setExercise(exercisesData);
    }, [])

    return (
      <div className='homePage'>
        <div className='outer'>
          <div className='slogan'>
            <p id='make_your'>{t('makeyour')}</p>
            <h1>{t('body_shape')}</h1>
            <p id='pSlogan'>{t('slogan')}</p>
            {/* when click it will go to login/sign in page */}
            <button id="startBtn">{t('start_now')} </button>
          </div>
          <div className='inner'>
            <img id='fitness' src='src/Data/fitness.png' />
          </div>
        </div>
        <div className='recommandtions'>

        </div>
        <h2>{t('workout')}</h2>
        <Toolbar className='searchBar'>
          <Search allExercises={allExercises} setExercise={setExercise} />
          <FilterView allExercises={allExercises} setExercise={setExercise} />
        </Toolbar>
        <div className='exercisesBox'>
          <ExerciseList exercises={exercises} />
        </div>
      </div>
    )
};


export default Home;