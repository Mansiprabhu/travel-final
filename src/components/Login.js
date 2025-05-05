import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/predict'); // Navigate to prediction page after login
  };

  const handleRegister = () => {
    navigate('/register'); // Navigate to the register page
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <h1 className="brand">TravelSage</h1>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{' '}
          <button className="register-link" onClick={handleRegister}>
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
