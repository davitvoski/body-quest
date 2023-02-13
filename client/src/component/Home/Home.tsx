import { Button, Switch } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import {Search, Shop } from '@mui/icons-material';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import NavBar from './Nav';

type HomeProps = {

}

export const Home = () => {
    return (
        <div className='homePage'>
            <h1>Home page is here</h1>
        </div>
    )
}