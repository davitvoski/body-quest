import { useEffect, useState } from "react";
import "./App.css";
import HelloWorld from "./component/HelloWorld";
import { Home } from "./component/Home/Home";
import { Routes, Route } from "react-router";
import { Login } from "./component/Home/Login";
import NavBar from "./component/NavBar/Nav";
import Profile from "./component/Profile/Profile";
import { createTheme, PaletteMode, ThemeProvider, useMediaQuery } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import getDesignTokens from "./Theme";

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const mode = prefersDarkMode ? 'dark' : 'light'
  const Theme = createTheme(getDesignTokens(mode));

  return (
    <ThemeProvider theme={Theme}>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route  path='Login' element={<Login/>}/> */}
          <Route path="Profile" element={<Profile />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
