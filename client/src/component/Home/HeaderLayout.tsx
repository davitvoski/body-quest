import { Dialog, DialogTitle, DialogContent, Slide } from "@mui/material";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { TransitionProps } from "notistack";
import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import "../../styles/Home.css";
import MediaQuery, { useMediaQuery } from "react-responsive";

/**
 * Inspired by https://dribbble.com/shots/16371194-Fitness-Landing-Page
 * Image used from: https://www.pngitem.com/middle/hiToJmi_fitness-png-transparent-background-fitness-png-png-download/
 * Image License: Personal Use Only
 * Show main content of home pgae
 * @returns HeaderLayout
 */

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HeaderLayout = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleClose = () => {
    setOpen(false);
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

  const getUser = async () => {
    const res = await fetch("/api/authentication/getUser");
    const data = await res.json();
    if (data.user !== undefined) {
      setUsername(data.user.username);
    }
  };

  useEffect(() => {
    getUser();
  });

  const handleError = () => {
    console.error("There has been an error");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <>
      {isDesktopOrLaptop && (
        <div className="outer">
      {/* left part of the main page, slogan of the webiste*/}
      <div className="slogan">
        <p id="make_your">{t("makeyour")}</p>
        <h1>{t("body_shape")}</h1>
        <p id="pSlogan">{t("slogan")}</p>
        {/* when click it will go to login/sign page */}
        <button id="startBtn" onClick={handleClickOpen} tabIndex={-1}>{t("start_now")} </button>
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
      </div>
      {/* rigth side fitness image */}
      <div className="inner">
        <img id="fitness" src="/fitness.png" alt="Man holding a dumbbell and woman stretching" />
      </div>
    </div>
      )}

      {isTabletOrMobile && (
        <div className="container">
          <img src="/fitness.png" />
          <div className="center">
            <p>{t("makeyour")}</p>
            <h1>{t("body_shape")}</h1>
            <p>{t("slogan")}</p>
          </div>
        </div>
      )}
    </>
    
  );
};

export default HeaderLayout;
