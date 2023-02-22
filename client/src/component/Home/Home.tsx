import Toolbar from '@mui/material/Toolbar';
import { Search } from './Search';
import { useState, useEffect } from 'react';
import { ExerciseList } from '../Exercise/ExerciseList';
import { exercisesData } from '../../Data/testData';
import { FilterView } from '../Filter/FilterView';

export const Home = () => {
    const [allExercises, setAllExercise] = useState([]);
    const [exercises, setExercise] = useState(allExercises);
    async function fetchExercises() {
        const response = await fetch('/api/exercises', {
            method: 'GET',
          });
        
          const jsonData = await response.json();
          if (jsonData.statusCode === 404) {
            throw new Error(`Failed to fetch ${response.status}: ${response.statusText}`)
        }
        setAllExercise(jsonData);
        setExercise(jsonData);
    }
    useEffect(()=>{
        fetchExercises();
    }, [])
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