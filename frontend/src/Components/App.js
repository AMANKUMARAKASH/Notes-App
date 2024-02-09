import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import LoginPage from "../Pages/LoginPage";
import NotesPage from "../Pages/NotesPage";
import Notes from "./Notes";
import Note from "./Note";


function App() {
  


  return (
    <div className="App">
     <NotesPage/>
    </div>
  );
}

export default App;

