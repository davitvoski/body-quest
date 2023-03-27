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

    /**
     * Calculates the current level of a user based on XP
     * @param xp 
     * @returns Current level
     */
    const getLevelFromXP = (xp: number) => {
        return Math.floor((-5 + Math.sqrt(25+20 * xp)) / 10 + 1)
    }

    /**
     * Calculates total xp of a level
     * @param xp 
     * @returns XP from current level
     */
    const getXPFromLevel = (level: number) => {
        return 10 * level
    }

    const currentLevel = getLevelFromXP(props.experience)

    /**
     * Calculates how much XP is needed to reach the next level 
     * @param xp 
     * @returns XP until next level
     */
    const nextLevel = (xp: number) => {
        const level = getLevelFromXP(xp)
        return 10 * ((level + 1) * ((level + 1) - 1 ) / 2 )
    } // 10, 20, 30, etc.

    /**
     * Calculates how much XP is needed for all previous levels 
     * @param xp 
     * @returns XP of previous level
     */
    const prevLevels = (level: number) => {
        let total = 0
        for (let i = 0; i < level; i++) total += getXPFromLevel(i)
        return total
    }
    
    return(
        <Grid container spacing={4} sx={{ padding: "2% 5% 1% 5%" }}>
            <Grid item xs={4}>
                <Item sx={{ width: "auto", height: "100%" }}>
                    <Avatar 
                        alt={ props.username } 
                        src={ props.avatar ? props.avatar : ""} 
                        variant="rounded"
                        sx={{ width: "auto", height: "100%", margin: "auto" }}/>
                </Item>
            </Grid>
            <Grid item xs>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Item>{ props.username }</Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>{ props.email }</Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>{t('bio')}</Item>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Item>
                    <ExperienceBar xp={ props.experience - prevLevels(currentLevel) } xpNext={ nextLevel(props.experience) } level={ currentLevel }/>
                </Item>
            </Grid>
        </Grid>
    )
}

export default ProfileView;