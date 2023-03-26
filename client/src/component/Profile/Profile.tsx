import { Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import ProfileView from "./ProfileView";
import Item from "../modules/Item";
import TabPanel from "../modules/TabPanel";
import GoalView from "./GoalView";
import FavouriteView from "./FavouriteView";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";

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
  const { t } = useTranslation();
  const [username, setUsername] = useState("username here");
  const [email, setEmail] = useState("email here");
  const [picture, setPicture] = useState("");
  const [experience, setExperience] = useState(0);
  const [value, setValue] = useState(0);
  let { state } = useLocation();

  const getUser = async () => {
    let res;
    let data;
    console.log("state: ", state);

    if (state?.user) {
      res = await fetch("/api/authentication/getSpecificUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: state.user.email }),
      });
      data = await res.json();
    } else {
      res = await fetch("/api/authentication/getUser");
      data = await res.json();
    }

    console.log("data.user: ", data.user);

    if (data.user !== undefined) {
      setUsername(data.user.username);
      setEmail(data.user.email);
      setPicture(data.user.picture);
    }
  };

  useEffect(() => {
    if (state?.isUser) {
      return;
    }
    getUser();
  }, [state?.isUser, state?.user]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="profile">
      <ProfileView
        username={username}
        email={email}
        experience={experience}
        avatar={picture}
      ></ProfileView>
      <Item sx={{ margin: "0 5% 0 5%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          variant="fullWidth"
          textColor="inherit"
        >
          <Tab label={t("goals")} sx={{ width: "50%" }} />
          <Tab label={t("favourites")} sx={{ width: "50%" }} />
        </Tabs>
      </Item>
      <TabPanel index={0} value={value} {...a11yProps(0)}>
        <GoalView />
      </TabPanel>
      <TabPanel index={1} value={value} {...a11yProps(2)}>
        <FavouriteView />
      </TabPanel>
    </div>
  );
};

export default Profile;
