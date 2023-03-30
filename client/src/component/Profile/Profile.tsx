import { Grid, Tab, Tabs, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import ProfileView from "./ProfileView";
import Item from "../modules/Item";
import TabPanel from "../modules/TabPanel";
import GoalView from "./GoalView";
import FavouriteView from "./FavouriteView";
import { useTranslation } from "react-i18next";
import { GoalCompleted } from "./GoalCompleted";
import { IUser } from "../../../../shared";
import axios from "axios";
import ExperienceBar from "./ExperienceBar";
import { getLevelFromXP, nextLevel, prevLevels } from "../modules/Experience";
import { useNavigate } from "react-router";


function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}

/**
 * Profile that conatains a ProfileView, and will later contain a GoalView and FavouriteView
 * @returns Profile Page
 */
const Profile = () => {
    let navigate = useNavigate();
    const { t } = useTranslation();
    const theme = useTheme();
    const [username, setUsername] = useState("username here")
    const [email, setEmail] = useState("email here")
    const [picture, setPicture] = useState("")
    const [experience, setExperience] = useState(30)
    const [experienceGain, setExperienceGain] = useState(0)
    const [value, setValue] = useState(0);
    const [isOpen, setIsOpen] = useState(false)
    const [isAdmin, setIsAdmin] = useState(true);
    const [user, setUser] = useState<IUser>();

    const [profileWidth, setProfileWidth] = useState(3);
    const [contentWidth, setContentWidth] = useState(9);

    const currentLevel = getLevelFromXP(experience);

    const getUser = async () => {
        const res = await fetch("/api/authentication/getUser");
        const data = await res.json();
        if (data.user !== undefined) {
            setUser(data.user);
            setUsername(data.user.username);
            setEmail(data.user.email)
            setExperience(0)
            setPicture(data.user.picture)
            if (data.user.isAdmin) {
                setIsAdmin(true)
            }
        }
    }


/**
 * Remove user profile when admin delete user
 * @param user IUser
 */
const removeUserProfile = async () => {
    const response = confirm("Are you sure you want to delete this user profile?");
    if (response) {
        if (user !== undefined) {
            deletUser(user);
        }
        await fetch("api/authentication/logout");
        navigate("/");
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


useEffect(() => {
    function handleResize() {
        setProfileWidth(window.innerWidth > 750 ? 3.5 : 12);
        setContentWidth(window.innerWidth > 750 ? 8.5 : 12);
        setExperience(experience);
    }
    getUser();
    window.addEventListener('resize', handleResize)
}, []);

const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
};

const completeGoal = (goal: number, type: string) => {
    let xp = 1; // base 1 increase
    xp += Math.floor(goal / 5); // one XP per 5 amount of goal

    setExperience(experience + xp);
    setExperienceGain(xp);
    handlePopup();
};

const handlePopup = () => {
    setIsOpen(!isOpen);
};

return (
    <div className="profile content">
        <Grid container spacing={4} sx={{ padding: "2% 5% 1% 5%" }}>
            <Grid item xs={profileWidth}>
                {/* <ProfileView username={username} email={email} experience={experience} avatar={picture} /> */}
                <ProfileView isAdmin={isAdmin} removeUserProfile={removeUserProfile} />
            </Grid>

            <Grid item xs={contentWidth}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Item sx={{ border: 8, borderColor: theme.palette.logo.dark }}>
                            <ExperienceBar
                                xp={experience - prevLevels(currentLevel)}
                                xpNext={nextLevel(experience)}
                                level={currentLevel}
                            />
                        </Item>
                    </Grid>

                    <Grid item xs={12}>
                        <Item sx={{ m: "0% 0 1% 0" }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="secondary"
                                variant="fullWidth"
                                textColor="inherit"
                            >
                                <Tab label={t("goals")} sx={{ width: "50%", fontFamily: "Silkscreen", fontSize: 20 }} />
                                <Tab
                                    label={t("favourites")}
                                    sx={{ width: "50%", fontFamily: "Silkscreen", fontSize: 20 }}
                                />
                            </Tabs>
                        </Item>
                        <TabPanel index={0} value={value} {...a11yProps(0)}>
                            <GoalView completeGoal={completeGoal} />
                        </TabPanel>
                        <TabPanel index={1} value={value} {...a11yProps(2)}>
                            <FavouriteView />
                        </TabPanel>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

        {isOpen && <GoalCompleted handleClose={handlePopup} xp={experienceGain} open={isOpen} />}
    </div>
);
};

export default Profile;
