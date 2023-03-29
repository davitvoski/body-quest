import { Avatar, Button, Grid, Paper, styled, TextField, Typography, useTheme } from "@mui/material";
import React, { ChangeEvent, useEffect, useRef } from "react";
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useState } from "react";
import Item from "../modules/Item";
import { useTranslation } from "react-i18next";
import ExperienceBar from "./ExperienceBar";
import { enqueueSnackbar, SnackbarProvider } from "notistack";

/**
 * A view containing a user's details, such as username, email, experience, and level
 * @param props username, email, experience
 * @returns ProfileView
 */
const ProfileView = (props: { username: string; email: string; experience: number; avatar: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const theme = useTheme();
  const { t } = useTranslation();
  const [avatar, setAvatar] = useState<string>();
  const [username, setUsername] = useState<string>();
  let original = useRef<string>();

  useEffect(() => {
    setAvatar(props.avatar);
    setUsername(props.username);
  }, [props.avatar]);

  async function saveProfile() {
    console.log("saving profile");
    const resp = await fetch("/api/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        avatar: avatar,
      }),
    });

    console.log(resp);
    if (resp.status === 204) {
      enqueueSnackbar("No Changes Made", {
        autoHideDuration: 2000,
        variant: "info",
      });
    }

    // Change user
    if (resp.status === 200) {
    }

    if (!resp.ok) {
      enqueueSnackbar("Could not make changes", {
        autoHideDuration: 2000,
        variant: "error",
      });
    }
    // setUser(user)
    setIsEditing(!isEditing);
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    let uploadedImage = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(uploadedImage);

    reader.onload = (evt) => {
      if (!evt?.target?.result) {
        return;
      }
      setAvatar(evt.target.result.toString());
    };
  }

  return (
    <Grid container spacing={2}>
      <SnackbarProvider autoHideDuration={2000} maxSnack={1} />

      <Grid item xs={12} height={"100%"}>
        <Item sx={{ height: "100%" }}>
          <Avatar
            alt={props.username}
            src={avatar}
            variant="rounded"
            sx={{ width: "auto", height: "100%", margin: "auto", borderRadius: 0 }}
          />
        </Item>
      </Grid>
      {isEditing && (
        <Grid item xs={12} height={"100%"}>
          <Item sx={{ height: "100%", textAlign: "center" }}>
            <Typography>Change Profile Picture:</Typography>
            <input
              id="newImage"
              type="file"
              accept="image/gif,image/jpeg,image/jpg,image/png"
              onChange={(e) => handleImageChange(e)}
            />
          </Item>
        </Grid>
      )}
      <Grid item xs={12}>
        <Item sx={{ fontFamily: "Silkscreen", fontSize: 18, textAlign: "center" }}>
          {isEditing ? (
            <>
              <Typography>Change Username:</Typography>
              <TextField
                value={username}
                variant="standard"
                fullWidth
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setUsername(event.target.value);
                }}
              />
            </>
          ) : (
            "@" + username
          )}
        </Item>
      </Grid>
      <Grid item xs={12}>
        <Item sx={{ textAlign: "center" }}>
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(!isEditing)}
              sx={{ width: "100%", fontFamily: "Silkscreen", fontSize: 18 }}
            >
              Edit User
            </Button>
          ) : (
            <>
              <Button onClick={saveProfile} sx={{ width: "100%", fontFamily: "Silkscreen", fontSize: 18 }}>
                Save
              </Button>
              <Button
                onClick={() => {
                  console.log("avatar is " + avatar);
                  console.log("props.avatar is " + props.avatar);
                  setAvatar(props.avatar);
                  setUsername(props.username);
                  // Doesn't change the avatar if a user changes their avatar than tries to cancel
                  setIsEditing(!isEditing);
                }}
                sx={{ width: "100%", fontFamily: "Silkscreen", fontSize: 18 }}
              >
                Cancel
              </Button>
            </>
          )}
        </Item>
      </Grid>
    </Grid>
  );
};

export default ProfileView;
