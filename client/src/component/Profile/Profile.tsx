import { Avatar, Grid, Paper, styled } from "@mui/material";
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useState } from "react";
import { ProfileView } from "./ProfileView";

/**
 * Profile that conatains a ProfileView, and will later contain a GoalView and FavouriteView
 * @returns Profile Page
 */
export const Profile = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [experience, setExperience] = useState(0)

    return(
        <div className="profile">
            <ProfileView username={username} email={email} experience={experience}></ProfileView>
        </div>
    )
}