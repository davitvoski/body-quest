import { Grid, Tab, Tabs, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import ProfileView from "./ProfileView";
import Item from "../modules/Item";
import TabPanel from "../modules/TabPanel";
import GoalView from "./GoalView";
import FavouriteView from "./FavouriteView";
import { useTranslation } from "react-i18next";
import { GoalCompleted } from "./GoalCompleted";
import { useLocation } from "react-router";
import UserGoalView from "./UserGoalView";
import UserFavouriteView from "./UserFavouriteView";
import { getLevelFromXP, nextLevel, prevLevels } from "../modules/Experience";
import ExperienceBar from "./ExperienceBar";
import UserProfileView from "./UserProfileView";

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
  const [goals, setGoals] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const { state } = useLocation();

  const [profileWidth, setProfileWidth] = useState(3);
  const [contentWidth, setContentWidth] = useState(9);

  const [noUser, setNoUser] = useState(false);

  const currentLevel = getLevelFromXP(experience);
  const theme = useTheme();

  const getUser = async () => {
    const res = await fetch("/api/authentication/getSpecificUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: state.user.email }),
    });
    const data = await res.json();
    console.log("user in userprofile", data.user.username);
    if (data.user !== undefined) {
      setUsername(data.user.username);
      setEmail(data.user.email);
      setExperience(0);
      setPicture(data.user.picture);
      setGoals(data.user.goals);
      setFavourites(data.user.favourites);
      setExperience(data.user.experience);
    }
  };

  useEffect(() => {
    getUser().catch((err) => {
      console.log(err);
      setNoUser(true);
    });
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {!noUser ? (
        <div className="profile content">
          <Grid container spacing={4} sx={{ padding: "2% 5% 1% 5%" }}>
            <Grid item xs={profileWidth}>
              <UserProfileView email={state.user.email}></UserProfileView>
            </Grid>

            <Grid item xs={contentWidth}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Item
                    sx={{ border: 8, borderColor: theme.palette.logo.dark }}
                  >
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
                      <Tab
                        label={t("goals")}
                        sx={{
                          width: "50%",
                          fontFamily: "Silkscreen",
                          fontSize: 20,
                        }}
                      />
                      <Tab
                        label={t("favourites")}
                        sx={{
                          width: "50%",
                          fontFamily: "Silkscreen",
                          fontSize: 20,
                        }}
                      />
                    </Tabs>
                  </Item>
                  <TabPanel index={0} value={value} {...a11yProps(0)}>
                    <UserGoalView userGoals={goals} />
                  </TabPanel>
                  <TabPanel index={1} value={value} {...a11yProps(2)}>
                    <UserFavouriteView favourites={favourites} email={email} />
                  </TabPanel>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      ) : (
        <h1
          style={{
            margin: "auto",
            width: "50%",
            padding: "10px",
          }}
        >
          User Does Not Exist :(
        </h1>
      )}
    </>
  );
};

export default UserProfile;
