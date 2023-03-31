import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useRef } from "react";
import { useState } from "react";
import Item from "../modules/Item";
import { useTranslation } from "react-i18next";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { IUser } from "../../../../shared";
import { useLocation } from "react-router";

/**
 * A view containing a user's details, such as username, email, experience, and level
 * @param props username, email, experience
 * @returns ProfileView
 */
const UserProfileView = (props: { email: string }) => {
  const [user, setUser] = useState<IUser>();
  let originalAvatar = useRef<string>();
  let originialUsername = useRef<string>();
  const { state } = useLocation();

  // Get user
  useEffect(() => {
    console.log("props.email", state.user.email);
    const getUser = async () => {
      const res = await fetch("/api/authentication/getSpecificUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: state.user.email }),
      });
      const data = await res.json();
      console.log("user in userprofileView", data);
      if (data.user !== undefined) {
        originalAvatar.current = data.user.picture;
        originialUsername.current = data.user.username;
        setUser(data.user);
      }
    };

    getUser().catch((err) => {
      console.log(err);
      console.log("Error getting user");
    });
  }, []);

  return (
    <Grid container spacing={2}>
      <SnackbarProvider autoHideDuration={2000} maxSnack={1} />

      <Grid item xs={12} height={"100%"}>
        <Item sx={{ height: "100%" }}>
          <Avatar
            alt={user?.username}
            src={user?.picture}
            variant="rounded"
            sx={{
              width: "auto",
              height: "100%",
              margin: "auto",
              borderRadius: 0,
            }}
          />
        </Item>
      </Grid>

      <Grid item xs={12}>
        <Item
          sx={{ fontFamily: "Silkscreen", fontSize: 18, textAlign: "center" }}
        >
          @{user?.username}
        </Item>
      </Grid>
    </Grid>
  );
};

export default UserProfileView;
