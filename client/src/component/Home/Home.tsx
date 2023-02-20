import { Button, Switch } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import { Shop } from '@mui/icons-material';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import NavBar from '../NavBar/Nav';
import { Filter } from './Filter';
import { Search } from './Search';
import { useState } from 'react';
import { ExerciseList } from '../Exercise/ExerciseList';
import { exercisesData } from '../../Data/testData';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const Home = () => {
    const [allExercises, setAllExercise] = useState(exercisesData);
    const [exercises, setExercise] = useState(exercisesData);
    
    return (
        <div className='homePage'>
            <h2>WORKOUT OF THE DAY</h2>
            <Toolbar className='searchBar'>
                <Search allExercises={allExercises} setExercise={setExercise}/>
                <Filter />
            </Toolbar>
            <div className='exercisesBox'>
                <ExerciseList exercises={exercises} />
            </div>
        </div>
    )
}