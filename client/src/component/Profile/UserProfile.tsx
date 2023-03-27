import { Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import ProfileView from "./ProfileView";
import Item from "../modules/Item";
import TabPanel from "../modules/TabPanel";
import GoalView from "./GoalView";
import FavouriteView from "./FavouriteView";
import { useTranslation } from "react-i18next";
import { GoalCompleted } from "./GoalCompleted";
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
const UserProfile = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("username here");
  const [email, setEmail] = useState("email here");
  const [picture, setPicture] = useState("");
  const [experience, setExperience] = useState(0);
  const [value, setValue] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [goals, setGoals] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const { state } = useLocation();

  const getUser = async () => {
    const res = await fetch("/api/authentication/getSpecificUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: state.user.email }),
    });
    const data = await res.json();
    if (data.user !== undefined) {
      setUsername(data.user.username);
      setEmail(data.user.email);
      setExperience(0);
      setPicture(data.user.picture);
      setGoals(data.user.goals);
      setFavourites(data.user.favourites);
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
  };

  const handlePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="profile content">
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
        <GoalView
          completeGoal={completeGoal}
          userGoals={goals}
          isOtherUser={true}
        />
      </TabPanel>
      <TabPanel index={1} value={value} {...a11yProps(2)}>
        <FavouriteView favourites={favourites} isOtherUser={true} />
      </TabPanel>

      {isOpen && (
        <GoalCompleted
          handleClose={handlePopup}
          xp={experience!}
          open={isOpen}
        />
      )}
    </div>
  );
};

export default UserProfile;
