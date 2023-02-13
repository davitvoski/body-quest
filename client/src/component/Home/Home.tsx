import { Button, Switch } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import { Search, Shop } from '@mui/icons-material';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import NavBar from '../NavBar/Nav';

type HomeProps = {

}

export const Home = () => {
    return (
        <div>
            <div className='homePage'>
                <h1>Home page is here</h1>
            </div>
            <footer>
                Davit Voskerchyan <br />
                Raphael Canciani <br />
                Santiago Luna <br />
                Sophia Marshment<br />
                Wanting Huang <br />
            </footer>
        </div>
    )
}