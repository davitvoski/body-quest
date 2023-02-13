import { useEffect, useState } from 'react'
import './App.css'
import HelloWorld from './component/HelloWorld'
import { Home } from './component/Home/Home'
import {Routes, Route} from 'react-router';
import { Login } from './component/Home/Login';
import NavBar from './component/Home/Nav';

function App() {

  return (
    <div className="App">
      {/* <HelloWorld /> */}
      <NavBar />
      {/* <Home/> */}
      <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route  path='Login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
