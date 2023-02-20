import { useEffect, useState } from "react";
import "./App.css";
import HelloWorld from "./component/HelloWorld";
import { Home } from "./component/Home/Home";
import { Routes, Route } from "react-router";
import { Login } from "./component/Home/Login";
import NavBar from "./component/Home/Nav";
import { DetailView } from "./component/Home/DetailView";

function App() {
  return (
    <div className="App">
      {/* <HelloWorld /> */}
      <NavBar />
      {/* <Home/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Login" element={<Login />} />
        <Route path="Exercises" element={<DetailView />} />
      </Routes>
    </div>
  );
}

export default App;
