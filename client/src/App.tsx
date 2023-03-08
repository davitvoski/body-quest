import "./App.css";
import { createTheme, PaletteMode, ThemeProvider, useMediaQuery } from "@mui/material";
import getDesignTokens from "./Theme";
import { Routes, Route } from "react-router";
import NavBar from "./component/NavBar/Nav";
import Profile from "./component/Profile/Profile";
import Home from "./component/Home/Home";

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
