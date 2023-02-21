import Toolbar from '@mui/material/Toolbar';
import { Search } from './Search';
import { useState } from 'react';
import { ExerciseList } from '../Exercise/ExerciseList';
import { exercisesData } from '../../Data/testData';
import { FilterView } from '../Filter/FilterView';

export const Home = () => {
    const [allExercises, setAllExercise] = useState(exercisesData);
    const [exercises, setExercise] = useState(exercisesData);
    
    return (
        <div className='homePage'>
            <h2>WORKOUT OF THE DAY</h2>
            <Toolbar className='searchBar'>
                <Search allExercises={allExercises} setExercise={setExercise}/>
                <FilterView allExercises={allExercises} />
            </Toolbar>
            <div className='exercisesBox'>
                <ExerciseList exercises={exercises} />
            </div>
        </div>
    )
}