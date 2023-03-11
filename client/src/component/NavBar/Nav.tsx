import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Slide } from '@mui/material';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { TransitionProps } from '@mui/material/transitions';
import { LanguageNav } from './LanguageNav';
import { useTranslation} from "react-i18next";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import "../../styles/NavBar.css"

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

/**
 * Nav bar
 * @returns NavBar
 */
export default function NavBar() {
    const [username, setUsername] = useState("");
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();

    const getUser = async () => {
        const res = await fetch("/api/authentication/getUser");
        const data = await res.json();
        if (data.user !== undefined){            
            setUsername(data.user.username);
        }
    }

    const handleLogout = async () => {
        await fetch("api/authentication/logout");
        setUsername("");
    }

    const handleLogin = async (credentialResponse: CredentialResponse) => {
        const res = await fetch("/api/authentication/auth", {
            method: "POST",
            body: JSON.stringify({
                token: credentialResponse
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setUsername(data.user.Username);
        window.location.assign("/Profile");
    }

    const handleError = () => {
        console.error("There has been an error");
    }

    useEffect(() => {
        getUser();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                    
                    <Box 
                        display="flex"
                        width="10%"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-around"
                    >
                        <LanguageNav/>
                        
                        <>
                            {username == "" ? 
                            <IconButton 
                                style={{ 
                                    textDecoration: "none", 
                                    color: "white", 
                                    textTransform: "none",
                                    fontSize: "1rem",
                                    padding: "0"
                                }}
                                onClick={handleClickOpen}
                                title={t('login') as string | undefined}
                            >
                                <LoginIcon sx={{color: "blue"}} />
                            </IconButton>
                            :
                            <>
                                <IconButton 
                                    style={{ 
                                        textDecoration: "none", 
                                        color: "white", 
                                        textTransform: "none",
                                        fontSize: "1rem",
                                        padding: "0"
                                    }}
                                    onClick={handleLogout}
                                    title={t('logout') as string | undefined}
                                    href='/'
                                >
                                    <LogoutIcon sx={{color: "red"}} />
                                </IconButton>

                                <IconButton 
                                    style={{ 
                                        textDecoration: "none", 
                                        color: "white", 
                                        textTransform: "none",
                                        fontSize: "1rem",
                                        padding: "0"
                                    }}
                                    href="/Profile"
                                    title={t('go_profile') as string | undefined}

                                >
                                    <AccountCircleRoundedIcon />
                                </IconButton>
                                
                            </>
                            }
                        </>
                    </Box>
                   
                </Toolbar>
            </AppBar>

            <Dialog 
                onClose={handleClose} 
                open={open}
                TransitionComponent={Transition}
            >
                <DialogTitle color="black" >{t('login_str')}</DialogTitle>
                <DialogContent>
                    <GoogleLogin
                        onSuccess={handleLogin}
                        onError={handleError}
                    /> 
                </DialogContent>
            </Dialog>

        </Box>
    );
}
