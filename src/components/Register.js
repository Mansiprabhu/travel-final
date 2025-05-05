import React from 'react';
import './Form.css';

function Register() {
  return (
    <div className="registration-page-wrapper">
      <div className="registration-container">
        <h2>Register for TravelSage</h2>
        <form>
          <input type="text" placeholder="Full Name" required /><br/>
          <input type="email" placeholder="Email" required /><br/>
          <input type="password" placeholder="Password" required /><br/>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
