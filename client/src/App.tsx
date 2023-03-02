import { useEffect, useState } from "react";
import "./App.css";
import HelloWorld from "./component/HelloWorld";
import { Home } from "./component/Home/Home";
import { Routes, Route } from "react-router";
import { Login } from "./component/Home/Login";
import NavBar from "./component/NavBar/Nav";
import { Profile } from "./component/Profile/Profile";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='Login' element={<Login/>} />
        <Route path="Profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
