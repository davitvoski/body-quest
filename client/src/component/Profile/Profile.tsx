import { Avatar, Grid, Paper, styled } from "@mui/material";
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body1,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));

export const Profile = (props: { username: string; email: string; }) => {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [level, setLevel] = useState()

    return(
        <div className="profile">
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
                    <Item>this will be the xp bar</Item>
                </Grid>
            </Grid>
        </div>
    )
}