import { Avatar, Button, CircularProgress, Grid, TextField, Typography, useTheme } from "@mui/material";
import React, { ChangeEvent, useEffect, useRef } from "react";
import { useState } from "react";
import Item from "../modules/Item";
import { useTranslation } from "react-i18next";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { IUser, IUserPost } from "../../../../shared";
import axios from "axios";
import { useNavigate } from "react-router";

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
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
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
        setIsAdmin(data.user.isAdmin);
        setIsAdmin(true)
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
      enqueueSnackbar(`${t('no_changes_made')}`, {
        autoHideDuration: 2000,
        variant: "info",
      });
    }

    // Change user
    if (resp.status === 200) {
      enqueueSnackbar(`${t('changes_saved')}`, {
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
      enqueueSnackbar(`${t('could_not_make_changes')}`, {
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


  /**
 * Remove user profile when admin delete user
 * @param user IUser
 */
  const removeUserProfile = async (e: any) => {
    const response = confirm(`${t('delete_profile_confirm')}`);
    if (response) {
      if (user !== undefined) {
        deletALLPost(user);
        deletUser(user);
      }
      await fetch("api/authentication/logout");
    } else {
      e.preventDefault();
    }
  }
  /**
  * delete user, send request to server
  * @param user IUser
  */
  const deletUser = async (user: IUser) => {
    try {
      await axios.delete("/api/authentication/getUser", {
        data: {
          user: user
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * delete all posts related to the user when user deleted
   * @param user IUser
   */
  const deletALLPost = async (user: IUser) => {
    try {
      await axios.delete("/api/posts/deleteallposts", {
        data: {
          user: user
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container spacing={2}>
      <SnackbarProvider autoHideDuration={2000} maxSnack={1} />
      {isAdmin && <Grid item xs={12}>
        <Item sx={{ textAlign: "center" }}>
          <Button
            onClick={(e) => { removeUserProfile(e) }}
            sx={{ width: "100%", fontFamily: "Silkscreen", fontSize: 18 }}
            href="/"
          >
            {t('delete_user')}
          </Button>
        </Item>
      </Grid>}
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
            <Typography>{t('change_profile_picture')}:</Typography>
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
              <Typography>{t('change_username')}:</Typography>
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
              {t('edit_user')}
            </Button>
          ) : (
            <>
              <Button onClick={saveProfile} sx={{ width: "100%", fontFamily: "Silkscreen", fontSize: 18 }}>
                {t('save')}
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
                {t('cancel')}
              </Button>
            </>
          )}
        </Item>
      </Grid>
    </Grid>
  );
};

export default ProfileView;
