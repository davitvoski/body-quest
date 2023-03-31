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

/**
 * A view containing a user's details, such as username, email, experience, and level
 * @param props username, email, experience
 * @returns ProfileView
 */
const UserProfileView = (props: { email: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<IUser>();
  // This is a hacky way to force a re-render
  const [didUserUpdate, setDidUserUpdate] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  let originalAvatar = useRef<string>();
  let originialUsername = useRef<string>();

  // Get user
  useEffect(() => {
    console.log("user state: ", user);
    console.log("props.email", props.email);
    fetch("/api/authentication/getSpecificUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: props.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setUser({
          ...data.user,
        });
        originalAvatar.current = data.user.picture;
        originialUsername.current = data.user.username;
      })
      .catch((err) => console.log(err));
    return () => {
      setUser(undefined);
    };
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
