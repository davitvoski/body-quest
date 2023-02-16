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

type HomeProps = {

}

export const Home = () => {
    const [exercises, setExercise] = useState([{ 'namw': '2', 'target': '3' }]);

    return (
        <div className='homePage'>
            <Toolbar className='searchBar'>
                <Search />
                <Filter />
            </Toolbar>
            <div className='exercisesBox'>
                <ExerciseList exercises={exercises} />
            </div>
        </div>
    )
}