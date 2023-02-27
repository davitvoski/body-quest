import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';


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

                    <div id='subNav'>
                        <LanguageIcon sx={{ l: 0.5, width: 50 }}/>    
                        <Typography color="inherit">
                            {/* <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to={'/Login'}>
                            Login
                        </Link> */}

                            <Link
                                style={{ textDecoration: "none", color: "white" }}
                                to={'/Profile'}>
                                Profile
                            </Link>
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
