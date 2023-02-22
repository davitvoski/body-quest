import { Avatar, Grid, Paper, styled } from "@mui/material";
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body1,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));

export const ProfileView = (props: { username: string; email: string; experience: number;}) => {
    const getLevelFromXP = (xp: number) => {
        return Math.floor((-5 + Math.sqrt(25+20 * xp)) / 10 + 1)
    }

    const currentLevel = getLevelFromXP(props.experience)

    const nextLevel = (xp: number) => {
        return 10 * ((getLevelFromXP(xp) + 1) * ((getLevelFromXP(xp) + 1) - 1 ) / 2 )
    } 

    return(
        <Grid container spacing={4} sx={{ padding: "5%" }}>
            <Grid item xs={4}>
                <Item sx={{ width: "auto", height: "100%" }}>
                    <Avatar 
                        alt={ props.username } 
                        src="" 
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
                        <Item>bio here</Item>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Item>LVL { currentLevel }: { props.experience }/{ nextLevel(props.experience) } XP until LVL { currentLevel + 1 } </Item>
            </Grid>
        </Grid>
    )
}