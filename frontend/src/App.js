import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Habits from './pages/Habits';
import Chat from './pages/Chat';
import Timer from './pages/Timer';
import Profile from './pages/Profile';
import Emergency from './pages/Emergency';
import Burnout from './pages/Burnout';
import AnonymousChat from './pages/AnonymousChat';
import AcademicLoad from './pages/AcademicLoad';
import Journal from './pages/Journal';
import MoodHistory from './pages/MoodHistory';
import Games from './pages/Games';
import './App.css';

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/habits" element={isLoggedIn ? <Habits /> : <Navigate to="/" />} />
          <Route path="/chat" element={isLoggedIn ? <Chat /> : <Navigate to="/" />} />
          <Route path="/timer" element={isLoggedIn ? <Timer /> : <Navigate to="/" />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/" />} />
          <Route path="/emergency" element={isLoggedIn ? <Emergency /> : <Navigate to="/" />} />
          <Route path="/burnout" element={isLoggedIn ? <Burnout /> : <Navigate to="/" />} />
          <Route path="/anonymous" element={isLoggedIn ? <AnonymousChat /> : <Navigate to="/" />} />
          <Route path="/academic-load" element={isLoggedIn ? <AcademicLoad /> : <Navigate to="/" />} />
          <Route path="/journal" element={isLoggedIn ? <Journal /> : <Navigate to="/" />} />
          <Route path="/mood-history" element={isLoggedIn ? <MoodHistory /> : <Navigate to="/" />} />
          <Route path="/games" element={isLoggedIn ? <Games /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;