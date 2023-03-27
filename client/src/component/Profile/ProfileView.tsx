import { Avatar, Grid, Paper, styled, useTheme } from "@mui/material";
import React from "react";
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useState } from "react";
import Item from "../modules/Item";
import { useTranslation} from "react-i18next";
import ExperienceBar from "./ExperienceBar";

/**
 * A view containing a user's details, such as username, email, experience, and level
 * @param props username, email, experience
 * @returns ProfileView
 */
const ProfileView = (props: { username: string; email: string; experience: number; avatar?: string}) => {
    const theme = useTheme();
    const {t} = useTranslation();

    return(
        <Grid container spacing={2}>
            <Grid item xs={12} height={"100%"}>
                <Item sx={{ height: "100%" }}>
                    <Avatar 
                        alt={ props.username } 
                        src={ props.avatar ? props.avatar : ""} 
                        variant="rounded"
                        sx={{ width: "auto", height: "100%", margin: "auto", borderRadius: 0 }}/>
                </Item>
            </Grid>
            <Grid item xs={12}>
                <Item sx={{ fontFamily: "Silkscreen", fontSize: 18, textAlign: "center" }}>{ props.username }</Item>
            </Grid>
            <Grid item xs={12}>
                <Item sx={{ textAlign: "center" }}>{ props.email }</Item>
            </Grid>
        </Grid>
    )
}

export default ProfileView;