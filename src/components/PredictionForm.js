import React, { useState } from 'react';
import axios from 'axios';  // Ensure axios is installed
import './PredictionForm.css';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    airline: '',
    sourceCity: '',
    departureTime: '',
    stops: '',
    arrivalTime: '',
    destinationCity: '',
    travelClass: '',
    departureDate: ''
  });

  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send to backend
    const data = {
      // Assuming you're sending numeric data for prediction. Adjust this as per your model.
      duration: formData.departureTime,  // Assuming departureTime corresponds to flight duration in minutes
      days_left: formData.departureDate ? (new Date(formData.departureDate) - new Date()) / (1000 * 3600 * 24) : 0,  // Days left to departure
    };

    try {
      // Send POST request to Flask API for prediction
      const response = await axios.post('http://127.0.0.1:5000/predict', data);

      if (response.status === 200) {
        setPredictedPrice(response.data.predicted_price);
        setError('');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setPredictedPrice(null);
    }
  };

  return (
    <div className="page-container">
      {/* Header Dashboard (small size) */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">TravelSage</h1>
      </header>

      {/* Prediction Form */}
      <div className="form-wrapper">
        <h2 className="form-heading">Flight Price Prediction</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <select name="airline" value={formData.airline} onChange={handleChange}>
            <option value="">Select Airline</option>
            <option value="IndiGo">IndiGo</option>
            <option value="Air India">Air India</option>
            <option value="SpiceJet">SpiceJet</option>
          </select>

          <select name="sourceCity" value={formData.sourceCity} onChange={handleChange}>
            <option value="">Select Source City</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
          </select>

          <select name="departureTime" value={formData.departureTime} onChange={handleChange}>
            <option value="">Select Departure Time</option>
            <option value="Early Morning">Early Morning</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>

          <select name="stops" value={formData.stops} onChange={handleChange}>
            <option value="">Select Stops</option>
            <option value="0">Non-Stop</option>
            <option value="1">1 Stop</option>
            <option value="2">2 Stops</option>
          </select>

          <select name="arrivalTime" value={formData.arrivalTime} onChange={handleChange}>
            <option value="">Select Arrival Time</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>

          <select name="destinationCity" value={formData.destinationCity} onChange={handleChange}>
            <option value="">Select Destination City</option>
            <option value="Chennai">Chennai</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Kolkata">Kolkata</option>
          </select>

          <select name="travelClass" value={formData.travelClass} onChange={handleChange}>
            <option value="">Select Class</option>
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
          </select>

          <input
            type="date"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
          />

          <button type="submit">Predict</button>
        </form>

        {predictedPrice && (
          <div>
            <h3>Predicted Price: ${predictedPrice}</h3>
          </div>
        )}

        {error && (
          <div style={{ color: 'red' }}>
            <p>Error: {error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionForm;
