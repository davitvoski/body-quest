import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { LanguageNav } from './LanguageNav';
import { useTranslation} from "react-i18next";
import "../../styles/NavBar.css";

<<<<<<< HEAD
=======
/**
 * Nav bar
 * @returns NavBar
 */
>>>>>>> 97535bf4a9339ed3343b241361bc405e781b11d2
export default function NavBar() {
    const { t } = useTranslation();
    return (
        <Box id="navBar">
            <AppBar className='appbar' position="relative" color="secondary">
                <Toolbar className='toolbar'>
                    <Typography>
                        <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to={'/'}>
                            {t('home')}
                        </Link>
                    </Typography>

                    <div id='subNav'>
                        {/*  language button */}
                        <LanguageNav/>
                        
                        <Typography color="inherit">
                            {/* <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to={'/Login'}>
                            Login
                        </Link> */}

                            <Link
                                style={{ textDecoration: "none", color: "white" }}
                                to={'/Profile'}>
                                    {t('profile')}
                            </Link>
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
