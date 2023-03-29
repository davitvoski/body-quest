import { Avatar, Button, Grid, Paper, styled, TextField, Typography, useTheme } from "@mui/material";
import React from "react";
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useState } from "react";
import Item from "../modules/Item";
import { useTranslation } from "react-i18next";
import ExperienceBar from "./ExperienceBar";

/**
 * A view containing a user's details, such as username, email, experience, and level
 * @param props username, email, experience
 * @returns ProfileView
 */
const ProfileView = (props: {username: string; email: string; experience: number; avatar?: string }) => {
    const [isEditing, setIsEditing] = useState(false)
    const theme = useTheme();
    const { t } = useTranslation();

    const saveProfile = () => {
        setIsEditing(!isEditing)
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} height={"100%"}>
                <Item sx={{ height: "100%" }}>
                    <Avatar
                        alt={props.username}
                        src={props.avatar ? props.avatar : ""}
                        variant="rounded"
                        sx={{ width: "auto", height: "100%", margin: "auto", borderRadius: 0 }} />
                </Item>
            </Grid>
            {isEditing &&
                <Grid item xs={12} height={"100%"}>
                    <Item sx={{ height: "100%", textAlign: "center" }}>
                        <Typography>{t('change_profile_picture')}:</Typography>
                        <input id="newImage" type="file" accept="image/gif,image/jpeg,image/jpg,image/png" onChange={(e) => handleImageChange(e)} />
                    </Item>
                </Grid>
            }
            <Grid item xs={12}>
                <Item sx={{ fontFamily: "Silkscreen", fontSize: 18, textAlign: "center" }}>
                    {isEditing ?
                        <>
                            <Typography>{t('change_username')}:</Typography>
                            <TextField value={props.username} variant="standard" fullWidth />
                        </>
                        : ("@" + props.username)}
                </Item>
            </Grid>
            <Grid item xs={12}>
                <Item sx={{ textAlign: "center" }}>
                    {!isEditing ?
                        <Button onClick={() => setIsEditing(!isEditing)} sx={{ width: "100%", fontFamily: "Silkscreen", fontSize: 18 }}>
                            {t('edit_user')}
                        </Button> :
                        <>
                            <Button onClick={() => saveProfile()} sx={{ width: "100%", fontFamily: "Silkscreen", fontSize: 18 }}>
                                {t('save')}
                            </Button>
                            <Button onClick={() => setIsEditing(!isEditing)} sx={{ width: "100%", fontFamily: "Silkscreen", fontSize: 18 }}>
                                {t("cancel")}
                            </Button>
                        </>
                    }
                </Item>
            </Grid>
        </Grid>
    )
}

export default ProfileView;