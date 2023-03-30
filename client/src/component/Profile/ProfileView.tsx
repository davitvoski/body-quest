import { Avatar, Button, CircularProgress, Grid, TextField, Typography, useTheme } from "@mui/material";
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
const ProfileView = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<IUser>();
  // This is a hacky way to force a re-render
  const [didUserUpdate, setDidUserUpdate] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  let originalAvatar = useRef<string>();
  let originialUsername = useRef<string>();

  // Get user
  useEffect(() => {
    fetch("/api/authentication/getUser")
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data.user);
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
  }, [didUserUpdate]);

  async function saveProfile() {
    setIsLoading(true);
    const resp = await fetch("/api/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user!.username,
        avatar: user!.picture,
      }),
    });

    if (resp.status === 204) {
      enqueueSnackbar("No Changes Made", {
        autoHideDuration: 2000,
        variant: "info",
      });
    }

    // Change user
    if (resp.status === 200) {
      enqueueSnackbar("Changes Saved", {
        autoHideDuration: 2000,
        variant: "success",
      });
      const data = await resp.json();
      const newUser = data.user as IUser;
      console.log("data", newUser);
      setDidUserUpdate(!didUserUpdate);
      originalAvatar.current = newUser.picture;
      originialUsername.current = newUser.username;
    }

    if (!resp.ok) {
      enqueueSnackbar("Could not make changes", {
        autoHideDuration: 2000,
        variant: "error",
      });
    }
    // setUser(user)
    setIsLoading(false);
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
      setUser((curr) => {
        return { ...curr!, picture: evt.target!.result!.toString() };
      });
    };
  }

  return (
    <Grid container spacing={2}>
      <SnackbarProvider autoHideDuration={2000} maxSnack={1} />

      <Grid item xs={12} height={"100%"}>
        <Item sx={{ height: "100%" }}>
          <Avatar
            alt={user?.username}
            src={user?.picture}
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
                value={user?.username}
                variant="standard"
                fullWidth
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setUser((cur) => {
                    return { ...user, username: event.target.value } as IUser;
                  });
                }}
              />
            </>
          ) : (
            "@" + user?.username
          )}
        </Item>
      </Grid>
      <Grid item xs={12}>
        <Item sx={{ textAlign: "center" }}>
          {isLoading ? (
            <CircularProgress color="secondary" />
          ) : !isEditing ? (
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
                  console.log(originalAvatar.current);
                  console.log(originialUsername.current);
                  setUser((cur) => {
                    return {
                      ...user,
                      picture: originalAvatar.current,
                      username: originialUsername.current,
                    } as IUser;
                  });

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
