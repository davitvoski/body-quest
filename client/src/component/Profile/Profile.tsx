import { Grid, Stack, Tab, Tabs, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import ProfileView from "./ProfileView";
import Item from "../modules/Item";
import TabPanel from "../modules/TabPanel";
import GoalView from "./GoalView";
import FavouriteView from "./FavouriteView";
import { useTranslation } from "react-i18next";
import { GoalCompleted } from "./GoalCompleted";
import ExperienceBar from "./ExperienceBar";
import { getLevelFromXP, nextLevel, prevLevels } from "../modules/Experience";
import { useMediaQuery } from "react-responsive";
import { IUser } from "../../../../shared";
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
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [username, setUsername] = useState("username here");
  const [email, setEmail] = useState("email here");
  const [picture, setPicture] = useState("");
  const [experience, setExperience] = useState(30);
  const [experienceGain, setExperienceGain] = useState(0);
  const [value, setValue] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const [profileWidth, setProfileWidth] = useState(3);
  const [contentWidth, setContentWidth] = useState(9);

  const currentLevel = getLevelFromXP(experience);

  async function getUser() {
    const res = await fetch("/api/authentication/getUser");
    const data = await res.json();
    if (data.user !== undefined) {
      setUsername(data.user.username);
      setEmail(data.user.email);
      setExperience(data.user.experience);
      setPicture(data.user.picture);
    } else {
      navigate("/unauthorized");
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    getUser().catch((err) => {
      navigate("/unauthorized");
    });

    function handleResize() {
      setProfileWidth(window.innerWidth > 750 ? 3.5 : 12);
      setContentWidth(window.innerWidth > 750 ? 8.5 : 12);
      setExperience(experience);
    }
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handlePopup = () => {
    setIsOpen(!isOpen);
  };

  const completeGoal = async (goal: number, type: string) => {
    let xp = 1; // base 1 increase
    xp += Math.floor(goal / 5); // one XP per 5 amount of goal

    setExperience(experience + xp);
    setExperienceGain(xp);
    handlePopup();

    let resp;
    resp = await fetch("/api/users/experience", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ experience: experience + xp }),
    });
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 700px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 700px)" });

  return (
    <>
      {isDesktopOrLaptop && (
        <div className="profile content">
          <Grid container spacing={4} sx={{ padding: "2% 5% 1% 5%" }}>
            <Grid item xs={profileWidth}>
              {/* <ProfileView username={username} email={email} experience={experience} avatar={picture} /> */}
              <ProfileView />
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
      )}
      {isTabletOrMobile && (
        <div className="profile content">
          <Grid container spacing={5} direction="column">
            <Grid item xs={profileWidth}>
              {/* <ProfileView username={username} email={email} experience={experience} avatar={picture} /> */}
              <ProfileView />
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
      )}
    </>
  );
};

export default Profile;
