import { Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import ProfileView from "./ProfileView";
import Item from "../modules/Item";
import TabPanel from "../modules/TabPanel";
import GoalView from "./GoalView";
import FavouriteView from "./FavouriteView";
import { useTranslation} from "react-i18next";

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
    const {t} = useTranslation();
    const [username, setUsername] = useState("username here")
    const [email, setEmail] = useState("email here")
    const [avatar, setAvatar] = useState("")
    const [experience, setExperience] = useState(0)
    const [value, setValue] = useState(0);

    const getUser = async () => {
        const res = await fetch("/api/authentication/getUser");
        const data = await res.json();
        if (data.user !== undefined){            
            setUsername(data.user.username);
            setEmail(data.user.email)
            setAvatar(data.user.avatar)
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return(
        <div className="profile">
            <ProfileView username={username} email={email} experience={experience} avatar={avatar} ></ProfileView>
            <Item sx={{ margin: "0 5% 0 5%" }}>
                <Tabs value={value} onChange={handleChange} indicatorColor="secondary" variant="fullWidth" textColor="inherit">
                    <Tab label="Goals" sx={{ width: "50%" }} />
                    <Tab label="Favourites" sx={{ width: "50%" }} />
                </Tabs>
            </Item>
            <TabPanel index={0} value={value} {...a11yProps(0)}>
                <GoalView/>
            </TabPanel>
            <TabPanel index={1} value={value} {...a11yProps(2)}>
                <FavouriteView/>
            </TabPanel>
        </div>
    )
}

export default Profile;