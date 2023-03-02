import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';



export default function NavBar() {
    const [username, setUsername] = useState("");

    const getUser = async () => {
        const res = await fetch("/api/getUser");
        const data = await res.json();
        if (data !== undefined){
            setUsername(data.user.Username);
        }
    }

    const handleLogout = async () => {
        await fetch("api/logout");
        setUsername("");
        window.location.reload();
    }

    useEffect(() => {
        getUser();
    }, []);

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
                            <Link
                                style={{ textDecoration: "none", color: "white", marginRight: "5vw" }}
                                to={'/Login'}>
                                Login
                            </Link> 
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
        </Box>
    );
}
