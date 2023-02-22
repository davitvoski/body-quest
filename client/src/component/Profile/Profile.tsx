import { Avatar, Grid, Paper, styled } from "@mui/material";
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useState } from "react";
import { ProfileView } from "./ProfileView";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body1,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));

export const Profile = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [experience, setExperience] = useState(10)

    return(
        <div className="profile">
            <ProfileView username={username} email={email} experience={experience}></ProfileView>
        </div>
    )
}