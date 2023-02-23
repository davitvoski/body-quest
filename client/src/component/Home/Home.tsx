import Toolbar from '@mui/material/Toolbar';
import { Search } from './Search';
import { useState } from 'react';
import { ExerciseList } from '../Exercise/ExerciseList';
import { exercisesData } from '../../Data/testData';
import { FilterView } from '../Filter/FilterView';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IExercise } from '../Exercise/IExercises';

export const Home = () => {
    const [allExercises, setAllExercise] = useState<IExercise[]>([]);
    const [exercises, setExercise] = useState<IExercise[]>([]);
    
    return (
        <div className='homePage'>
            <h2>WORKOUT OF THE DAY</h2>
            <Toolbar className='searchBar'>
                <Search allExercises={allExercises} setExercise={setExercise}/>
                <FilterView allExercises={allExercises} setExercise={setAllExercise} />
            </Toolbar>
            <div className='exercisesBox'>
                <ExerciseList exercises={exercises} />
            </div>
        </div>
    )
}