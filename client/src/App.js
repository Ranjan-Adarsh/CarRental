
import { Component, useState } from 'react';
import SearchBar from './Search.js'
import LogIn from './logIn.js';
import Axios from 'axios';
import TransactionPage from './Transaction';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

export default function App() {

  // const handleClick = () =>{
  //   Axios.post("http://localhost:3001/status",{}).then((response) => {
  //     console.log("done");
  //   })
  // }
  return (
    //<button type="button" onClick={handleClick}>click</button>
    <Router>
      <div>
        <nav>
          <ul>
            <Link to="/logIn/">
            </Link>
          </ul>
          </nav>

        <Routes>
        <Route path='/' element={<LogIn/>}></Route>
        <Route path='/logIn/*' element={<LogIn/>}></Route>
        <Route path='/Search/*' element={<SearchBar/>}></Route>
        <Route path='/Transaction/*' element={<TransactionPage/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}




