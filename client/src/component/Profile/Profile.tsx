import { Avatar, Button, Grid, Paper, styled, Tab, Tabs } from "@mui/material";
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useState } from "react";
import { ProfileView } from "./ProfileView";
import { Item } from "../modules/Item";
import { TabPanel } from "../modules/TabPanel";

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

/**
 * Profile that conatains a ProfileView, and will later contain a GoalView and FavouriteView
 * @returns Profile Page
 */
export const Profile = () => {
    const [username, setUsername] = useState("username here")
    const [email, setEmail] = useState("email here")
    const [experience, setExperience] = useState(0)
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return(
        <div className="profile">
            <ProfileView username={username} email={email} experience={experience}></ProfileView>
            <Item sx={{ margin: "0 5% 0 5%" }}>
                <Tabs value={value} onChange={handleChange} indicatorColor="secondary" variant="fullWidth" textColor="inherit">
                    <Tab label="Goals" sx={{ width: "50%" }} />
                    <Tab label="Favourites" sx={{ width: "50%" }} />
                </Tabs>
                <TabPanel index={0} value={value} {...a11yProps(0)}>Goals Here</TabPanel>
                <TabPanel index={1} value={value} {...a11yProps(2)}>Favourites Here</TabPanel>
            </Item>
        </div>
    )
}