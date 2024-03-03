import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login'; 
import Secret from './pages/Secret' ;
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
  export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Secret />} />
          <Route path="/register" element = {<Register/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Secret />} />
        </Routes>
      </BrowserRouter>
    );
  }
