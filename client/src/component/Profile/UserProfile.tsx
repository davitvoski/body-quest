import { Grid, LinearProgress, Tab, Tabs, useTheme } from "@mui/material";
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
import { useMediaQuery } from "react-responsive";
import "../../styles/UserProfile.css";

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
  const [email, setEmail] = useState("email here");
  const [experience, setExperience] = useState(0);
  const [value, setValue] = useState(0);
  const [goals, setGoals] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useLocation();

  const [profileWidth, setProfileWidth] = useState(3);
  const [contentWidth, setContentWidth] = useState(9);

  const [noUser, setNoUser] = useState(false);

  const currentLevel = getLevelFromXP(experience);
  const theme = useTheme();

  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState("");

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
      setEmail(data.user.email);
      setExperience(0);
      setGoals(data.user.goals);
      setFavourites(data.user.favourites);
      setExperience(data.user.experience);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getUser().catch((err) => {
      setNoUser(true);
    });
    ifAdmin().catch((err) => {});
    setTimeout(() => setIsLoading(false), 200);
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  /**
   * check if is admin user when loggin
   * @returns ifAdmin
   */
  const ifAdmin = async () => {
    const res = await fetch("/api/authentication/getUser");
    const currentUser = await res.json();
    if (currentUser.user !== undefined) {
      if (currentUser.user.isAdmin) {
        setIsAdmin(true);
      }
      setCurrentUserEmail(currentUser.user.email);
    }
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 600px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <>
      {isLoading && <LinearProgress sx={{ width: "60%", margin: "10% auto 5% auto" }} />}
      {!noUser && isLoading === false ? (
        <>
          {isDesktopOrLaptop && (
            <div className="profile content">
              <Grid container spacing={4} sx={{ padding: "2% 5% 1% 5%" }}>
                <Grid item xs={profileWidth}>
                  <UserProfileView
                    currentUserEmail={currentUserEmail}
                    isAdmin={isAdmin}
                    email={state.user.email}
                  ></UserProfileView>
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
          )}
          {isTabletOrMobile && (
            <div className="profile content">
              <Grid container spacing={5} direction="column">
                <Grid item xs={profileWidth}>
                  <UserProfileView
                    currentUserEmail={currentUserEmail}
                    isAdmin={isAdmin}
                    email={state.user.email}
                  ></UserProfileView>
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
          )}
        </>
      ) : (
        <>
          {noUser && isLoading === false && (
            <h1
              className="themed-text"
              style={{
                margin: "auto",
                width: "50%",
                padding: "10px",
              }}
            >
              User Does Not Exist
            </h1>
          )}
        </>
      )}
    </>
  );
};

export default UserProfile;
