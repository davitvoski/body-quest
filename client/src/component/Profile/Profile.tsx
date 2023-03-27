import { Tab, Tabs } from "@mui/material";
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
const Profile = () => {
    const { t } = useTranslation();
    const [username, setUsername] = useState("username here")
    const [email, setEmail] = useState("email here")
    const [picture, setPicture] = useState("")
    const [experience, setExperience] = useState(0)
    const [value, setValue] = useState(0);
    const [isOpen, setIsOpen] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState<IUser>();
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
        const response = confirm("Are you sure you want to delete this user?");
        if (response) {
            await fetch("api/authentication/logout");
            setUsername("");
            // deletUser(user);
        }
    }
    /**
     * delete user, send request to server
     * @param user IUser
     */
    const deletUser = async (user: IUser) => {
        try {
            await axios.delete("/api/auth", {
                data: {
                    user: user
                }
            });
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getUser();
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const completeGoal = (goal: number, type: string) => {
        let xp = experience + 5; // base 5 increase
        xp += Math.floor(goal / 5); // one XP per 5 amount of goal

        setExperience(xp);
        handlePopup();
    }

    const handlePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="profile content">
            <ProfileView removeUserProfile={removeUserProfile} isAdmin={isAdmin} username={username} email={email} experience={experience} avatar={picture} ></ProfileView>
            <Item sx={{ margin: "0 5% 0 5%" }}>
                <Tabs value={value} onChange={handleChange} indicatorColor="secondary" variant="fullWidth" textColor="inherit">
                    <Tab label={t("goals")} sx={{ width: "50%" }} />
                    <Tab label={t("favourites")} sx={{ width: "50%" }} />
                </Tabs>
            </Item>
            <TabPanel index={0} value={value} {...a11yProps(0)}>
                <GoalView completeGoal={completeGoal} />
            </TabPanel>
            <TabPanel index={1} value={value} {...a11yProps(2)}>
                <FavouriteView />
            </TabPanel>

            {isOpen &&
                <GoalCompleted
                    handleClose={handlePopup}
                    xp={experience!}
                    open={isOpen}
                />
            }
        </div>
    )
}

export default Profile;