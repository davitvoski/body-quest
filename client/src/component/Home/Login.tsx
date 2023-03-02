import { Box, Button, Grid, Typography } from '@mui/material';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from 'react';

export const Login = () => {
    const [username, setUsername] = useState("");

    const getUser = async () => {
        const res = await fetch("/api/getUser");
        const data = await res.json();
        if (data !== undefined){
            setUsername(data.user.Username);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    const handleLogin = async (credentialResponse: CredentialResponse) => {
        const res = await fetch("/api/auth", {
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

    const handleLogout = async () => {
        await fetch("api/logout");
        setUsername("");
    }

    return (
        <>
            <Typography 
                color="inherit" 
                variant='h4'
            >
                Welcome {username ? username : "Anonymous"}
            </Typography>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Grid item xs={3}>
                <GoogleLogin
                    onSuccess={handleLogin}
                    onError={handleError}
                />            
                </Grid>   
            
            </Grid> 

            {username && 
                <Button 
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            }
        </>
    )
}