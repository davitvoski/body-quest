import { Avatar, Button, Grid, Paper, styled } from "@mui/material";
import React from "react";
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useState } from "react";
import Item from "../modules/Item";
import { useTranslation } from "react-i18next";

/**
 * A view containing a user's details, such as username, email, experience, and level
 * @param props username, email, experience
 * @returns ProfileView
 */
const ProfileView = (props: { username: string; email: string; experience: number; avatar?: string; isAdmin: boolean }) => {
    console.log(props.avatar);

    const { t } = useTranslation();

    /**
     * Calculates the current level of a user based on XP
     * @param xp 
     * @returns Current level
     */
    const getLevelFromXP = (xp: number) => {
        return Math.floor((-5 + Math.sqrt(25 + 20 * xp)) / 10 + 1)
    }

    const currentLevel = getLevelFromXP(props.experience)

    /**
     * Calculates how much XP is needed to reach the next level 
     * @param xp 
     * @returns XP until next level
     */
    const nextLevel = (xp: number) => {
        return 10 * ((getLevelFromXP(xp) + 1) * ((getLevelFromXP(xp) + 1) - 1) / 2)
    } // 10, 20, 30, etc.

    return (
        <Grid container spacing={4} sx={{ padding: "2% 5% 1% 5%" }}>
            <Grid item xs={4}>
                <Item sx={{ width: "auto", height: "100%" }}>
                    <Avatar
                        alt={props.username}
                        src={props.avatar ? props.avatar : ""}
                        variant="rounded"
                        sx={{ width: "auto", height: "100%", margin: "auto" }} />
                </Item>
            </Grid>
            <Grid item xs>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Item>{props.username}</Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>{props.email}</Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>{t('bio')}</Item>
                    </Grid>

                    {/* admin can delete system user*/}
                    <Grid item xs={12}>
                        {props.isAdmin && <Button variant="contained"> Delete user profile </Button>}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Item>LVL {currentLevel}: {nextLevel(props.experience) - props.experience} XP {t('until')} LVL {currentLevel + 1} </Item>
            </Grid>
        </Grid>
    )
}

export default ProfileView;