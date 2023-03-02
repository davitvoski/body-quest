import { Box, Button, Typography } from '@mui/material';
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
        // we will come back to this, since our server will be replying with our info
        setUsername(data.user.Username);
    }

    const handleError = () => {
        console.error("There has been an error");
    }

    const handleLogout = async () => {
        await fetch("api/logout");
        setUsername("");
    }

    const protectedRoute = async () => {
        const response = await fetch("api/protected");
        if (response.status === 200) {
            alert("You are authorized to see this!");
        } else if (response.status === 401) {
            alert("You are not authorized to see this!");
        } else {
            alert("Something went wrong!");
        }
    }

    return (
        <>
            <Typography color="inherit">
                Welcome {username ? username : "Anonymous"}
            </Typography>

            <Box>
                <GoogleLogin
                    onSuccess={handleLogin}
                    onError={handleError}
                />
            </Box>

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