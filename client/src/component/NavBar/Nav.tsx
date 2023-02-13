import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Button, FormControl, IconButton, InputLabel, MenuItem } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { Login } from '../Home/Login';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Filter } from './Filter';
import { Search } from './Search';



export default function NavBar() {
    const [type, setType] = React.useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value);
    };
    return (
        <Box>
            <AppBar className='appbar' position="absolute">
                <Toolbar className='toolbar'>
                    <Typography>
                        <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to={'/'}>
                            Home
                        </Link>
                    </Typography>

                    <Search />
                    <Filter />

                    <Typography color="inherit">
                        <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to={'/Login'}>
                            Login
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
