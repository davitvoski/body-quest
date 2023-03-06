import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { LanguageNav } from './LanguageNav';
import i18n from "./i18next";
import { useTranslation, initReactI18next, Trans } from "react-i18next";


export default function NavBar() {
    const { t } = useTranslation();
    return (
        <Box id="navBar">
            <AppBar className='appbar' position="relative">
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
