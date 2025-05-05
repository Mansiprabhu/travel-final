// src/pages/Home.js
import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/login');
  };

  return (
    <div className="home">
      <h1>Welcome to TravelSage</h1>
      <button onClick={handleExplore}>Explore Now</button>
    </div>
  );
};

export default Home;
