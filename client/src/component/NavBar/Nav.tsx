import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Slide } from '@mui/material';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function NavBar() {
    const [username, setUsername] = useState("");
    const [open, setOpen] = useState(false);

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
        window.location.reload();
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
        window.location.reload();
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
                            Home
                        </Link>
                    </Typography>

                    <Typography color="inherit">
                        {username == "" ? 
                            <Button 
                            style={{ 
                                textDecoration: "none", 
                                color: "white", 
                                marginRight: "5vw",
                                textTransform: "none",
                                fontSize: "1rem",
                                padding: "0"
                            }}
                            onClick={handleClickOpen}
                        >
                            Login
                        </Button>
                            :
                            <Button 
                                style={{ 
                                    textDecoration: "none", 
                                    color: "white", 
                                    marginRight: "5vw",
                                    textTransform: "none",
                                    fontSize: "1rem",
                                    padding: "0"
                                }}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        }
                        
                        <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to={'/Profile'}>
                            Profile
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>

            <Dialog 
                onClose={handleClose} 
                open={open}
                TransitionComponent={Transition}
            >
                <DialogTitle>Login to Body Quest</DialogTitle>
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
