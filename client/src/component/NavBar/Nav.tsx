import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';



export default function NavBar() {
    return (
        <Box id="navBar">
            <AppBar className='appbar' position="relative">
                <Toolbar className='toolbar'>
                    <Typography>
                        <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to={'/'}>
                            Home
                        </Link>
                    </Typography>

                    <Typography color="inherit">
                        <Link
                            style={{ textDecoration: "none", color: "white", marginRight: "5vw" }}
                            to={'/Login'}>
                            Login
                        </Link> 
                        <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to={'/Profile'}>
                            Profile
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
