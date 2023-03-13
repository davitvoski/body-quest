import "./App.css";
import {
  createTheme,
  PaletteMode,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import getDesignTokens from "./Theme";
import { Routes, Route, Outlet } from "react-router";
import NavBar from "./component/NavBar/Nav";
import Profile from "./component/Profile/Profile";
import { GoalForm } from "./component/Goal/GoalForm";
import Home from "./component/Home/Home";
import { Feed } from "./component/Feed/Feed";
import { PostForm } from "./component/Feed/PostForm/PostForm";
import { useState } from "react";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const themes = {
    dark: createTheme(getDesignTokens("dark")),
    light: createTheme(getDesignTokens("light")),
  };
  const mode = prefersDarkMode ? themes.dark : themes.light;
  const [Theme, setTheme] = useState(mode);

  const changeTheme = (current: string) => {
    const newTheme = current === "dark" ? themes.light : themes.dark;
    setTheme(newTheme);

    if (newTheme.palette.mode === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  };

  return (
    <ThemeProvider theme={Theme}>
      <div className={Theme.palette.mode + " App"}>
        <NavBar Theme={Theme} changeTheme={changeTheme} />
        <Outlet />
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="Goalcreation" element={<GoalForm />} />  
          <Route path="Postcreation" element={<PostForm />} />
        </Routes> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
