import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MainMenu from './mainMenu/mainMenu';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LobbyMaker from './lobbyMaker/lobbyMaker';
import Lobby from './lobby/lobby';
import PairReveal from './pairReveal/pairReveal';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainMenu/>,
    },
    {
      path: "/stworz/pokoj",
      element: <LobbyMaker/>
    },
    {
      path: "/lobby/:lobbyId",
      element: <Lobby/>
    },
    {
      path: "lobby/:lobbyId/:hash",
      element: <PairReveal/>
    }
  ]);
  
  return (
    <div className='app-container' >
      <img className='background-img' src={`${process.env.PUBLIC_URL}/background2.jpg`}></img>

      <div className='page-container'>
        <RouterProvider router={router}/>
      </div>

    </div>
  );
}

export default App;
