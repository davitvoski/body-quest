import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
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
import AddIcon from "@mui/icons-material/Add";
import FeedIcon from "@mui/icons-material/Feed";

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
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
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
    setIsLoading(false);

    handleClose();
    navigate("/Profile");
  };

  useEffect(() => {
    getUser();
    //either hide or show add post button
    window.location.hash === "#/Feed" ? setIsFeed(true) : setIsFeed(false);
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
    <Box id="navBar" position="fixed" width="100%" zIndex="2">
      <AppBar className="appbar" position="relative" color="secondary">
        <Toolbar className="toolbar">
          <Box display="flex" justifyContent="space-between" marginLeft={5}>
            <Box
              display="flex"
              width="60%"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-around"
            >
              <Link to={"/"} tabIndex={0}>
                {props.Theme.palette.mode === "dark" ? (
                  <img
                    className="logo"
                    src="/logo-dark.svg"
                    alt="BodyQuest Logo"
                    title="Home"
                    role="button"
                  />
                ) : (
                  <img
                    className="logo"
                    src="/logo-light.svg"
                    alt="BodyQuest Logo"
                    title={t("home") as string}
                    role="button"
                  />
                )}
              </Link>
            </Box>
          </Box>
          <Box
            display="flex"
            marginLeft={5}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-around"
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={"/Feed"}
              tabIndex={0}
            >
              <IconButton sx={{ color: "white" }} title={t("feed") as string}>
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
                  title={t("login") as string}
                >
                  <LoginIcon color="inherit" />
                </IconButton>
              ) : (
                <>
                  <Link
                    to="/"
                    style={{ display: "inline-block", color: "white" }}
                    tabIndex={0}
                  >
                    <IconButton
                      color="inherit"
                      onClick={handleLogout}
                      title={t("logout") as string}
                      href="/"
                    >
                      <LogoutIcon color="inherit" />
                    </IconButton>
                  </Link>

                  <Link
                    to="/Profile"
                    style={{ display: "inline-block", color: "white" }}
                    tabIndex={0}
                  >
                    <IconButton
                      color="inherit"
                      title={t("go_profile") as string}
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
        <DialogTitle>{t("login_str")}</DialogTitle>
        <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
          {!isLoading ? (
            <GoogleLogin onSuccess={handleLogin} onError={handleError} />
          ) : (
            <CircularProgress />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
