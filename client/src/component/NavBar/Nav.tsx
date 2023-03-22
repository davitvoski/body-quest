import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Theme,
} from "@mui/material";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { TransitionProps } from "@mui/material/transitions";
import { LanguageNav } from "./LanguageNav";
import { useTranslation } from "react-i18next";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import "../../styles/NavBar.css";
import { ThemeNav } from "./ThemeNav";
import AddIcon from '@mui/icons-material/Add';
import FeedIcon from '@mui/icons-material/Feed';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Nav bar
 * @returns NavBar
 */
export default function NavBar(props: {
  Theme: Theme;
  changeTheme: (current: string) => void;
}) {
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isFeed, setIsFeed] = useState(false);

  const getUser = async () => {
    const res = await fetch("/api/authentication/getUser");
    const data = await res.json();
    if (data.user !== undefined) {
      setUsername(data.user.username);
    }
  };

  const handleLogout = async () => {
    await fetch("api/authentication/logout");
    setUsername("");
  };

  const handleLogin = async (credentialResponse: CredentialResponse) => {
    const res = await fetch("/api/authentication/auth", {
      method: "POST",
      body: JSON.stringify({
        token: credentialResponse,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setUsername(data.user.Username);

    handleClose();
    navigate("/Profile");
  };

  useEffect(() => {
    getUser();
    //either hide or show add post button    
    window.location.hash === "#/Feed" ? setIsFeed(true) : setIsFeed(false)    
  });

  const handleError = () => {
    console.error("There has been an error");
  };

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
    <Box id="navBar" 
      position="fixed"
      width="100%"
      zIndex="2"
    >
      <AppBar className="appbar" position="relative" color="secondary">
        <Toolbar className="toolbar">
          <Box
            display="flex"
            justifyContent="space-between"
            width="20%"
          >
            <Box
              display="flex"
              width="60%"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-around"
            >
              <Link to={"/"}>
                {props.Theme.palette.mode === "dark" ? (
                  <img
                    className="logo"
                    src="/logo-dark.svg"
                    alt="BodyQuest Logo"
                    title="Home"
                  />
                ) : (
                  <img
                    className="logo"
                    src="/logo-light.svg"
                    alt="BodyQuest Logo"
                    title="Home"
                  />
                )}
              </Link>
            </Box>
            {isFeed && username !== "" && 
              <Box
                alignSelf="center"
              >
                <Button 
                    variant="contained" 
                    startIcon={<AddIcon />}  
                    size="small"     
                    //sx={{marginLeft: "3vw"}}
                    href="#/Postcreation"
                >
                  Add Post
                </Button>
              </Box>
              }
          </Box>
          <Box
            display="flex"
            width="15%"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-around"
          >
            <Link
              style={{ textDecoration: "none", color: "white"}}
              to={'/Feed'}
              >
              <IconButton
                style={{
                  textDecoration: "none",
                  color: "white",
                  textTransform: "none",
                  fontSize: "1rem",
                  padding: "0",
                }}
                title="Feed"
              >
                <FeedIcon />
              </IconButton>              
            </Link>
            <LanguageNav />
            <ThemeNav Theme={props.Theme} changeTheme={props.changeTheme} />

            <>
              {username == "" ? (
                <IconButton
                  sx={{ color: "white" }}
                  onClick={handleClickOpen}
                  title={t("login") as string | undefined}
                >
                  <LoginIcon color="inherit" />
                </IconButton>
              ) : (
                <>
                  <Link to="/" style={{display: "inline-block", color: "white"}}>
                    <IconButton
                      color="inherit"
                      onClick={handleLogout}
                      title={t("logout") as string | undefined}
                      href="/"
                    >
                      <LogoutIcon color="inherit" />
                    </IconButton>
                  </Link>

                  <Link to="/Profile" style={{display: "inline-block", color: "white"}}>
                    <IconButton
                      color="inherit"
                      title={t("go_profile") as string | undefined}
                    >
                      <AccountCircleRoundedIcon />
                    </IconButton>
                  </Link>
                </>
              )}
            </>
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog
        onClose={handleClose}
        open={open}
        TransitionComponent={Transition}
      >
        <DialogTitle color="black">{t("login_str")}</DialogTitle>
        <DialogContent>
          <GoogleLogin onSuccess={handleLogin} onError={handleError} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
