import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const apiBaseUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`;
  
  console.log('App Component Loaded');
  console.log('API Base URL:', apiBaseUrl);

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              🐙 OctoFit Tracker
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home apiBaseUrl={apiBaseUrl} />} />
            <Route path="/users" element={<Users apiBaseUrl={apiBaseUrl} />} />
            <Route path="/activities" element={<Activities apiBaseUrl={apiBaseUrl} />} />
            <Route path="/workouts" element={<Workouts apiBaseUrl={apiBaseUrl} />} />
            <Route path="/teams" element={<Teams apiBaseUrl={apiBaseUrl} />} />
            <Route path="/leaderboard" element={<Leaderboard apiBaseUrl={apiBaseUrl} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Home({ apiBaseUrl }) {
  return (
    <div className="text-center">
      <h1>Welcome to OctoFit Tracker</h1>
      <p className="lead">Track your fitness activities and compete with your team!</p>
      <p>API Base URL: {apiBaseUrl}</p>
    </div>
  );
}

export default App;
