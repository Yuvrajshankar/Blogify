import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './Pages/auth/Login';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Footer from './Components/Footer/Footer';
import Profile from './Pages/Profile/Profile';
import WriteBlog from './Pages/WriteBlog/WriteBlog';
import FullBlog from './Pages/FullBlog/FullBlog';
import Register from './Pages/auth/Register';
import Error from './Pages/Error/Error';
import OtherProfile from './Pages/Profile/OtherProfile';
import axios from "axios";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>} />

        <Route path='/profile' element={
          <>
            <Navbar />
            <Profile />
            <Footer />
          </>
        }
        />

        <Route path='/profile/:id' element={
          <>
            <Navbar />
            <OtherProfile />
            <Footer />
          </>} />

        <Route path='/create' element={
          <>
            <Navbar />
            <WriteBlog />
            <Footer />
          </>
        }
        />

        <Route path='/blog/:id' element={
          <>
            <Navbar />
            <FullBlog />
            <Footer />
          </>} />

        <Route path='/register' element={<Register />} />

        <Route path='/login' element={<Login />} />

        <Route path='/*' element={<Error />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;