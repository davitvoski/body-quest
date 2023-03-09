import "./App.css";
import { createTheme, PaletteMode, ThemeProvider, useMediaQuery } from "@mui/material";
import getDesignTokens from "./Theme";
import { Routes, Route } from "react-router";
import NavBar from "./component/NavBar/Nav";
import Profile from "./component/Profile/Profile";
import Home from "./component/Home/Home";
import { useState } from "react";

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const themes = {
    dark: createTheme(getDesignTokens('dark')),
    light: createTheme(getDesignTokens('light'))
  }
  const mode = prefersDarkMode ? themes.dark : themes.light
  const [Theme, setTheme] = useState(mode);

  const changeTheme = (current: string) => {
    const newTheme = current === 'dark' ? themes.light : themes.dark;
    setTheme(newTheme)

    if (newTheme.palette.mode === 'dark') {
      document.body.classList.add('dark');
      document.body.classList.remove('light')
    } else {
      document.body.classList.remove('dark')
      document.body.classList.add('light');
    }
  }

  return (
    <ThemeProvider theme={Theme}>
      <div className="App">
        <NavBar Theme={Theme} changeTheme={changeTheme}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Profile" element={<Profile />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
