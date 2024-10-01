import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';

const WeatherBar = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        'https://api.open-meteo.com/v1/forecast?latitude=22.30&longitude=73.18&current_weather=true'
      );
      setWeather(response.data.current_weather);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch weather data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className='container' style={{marginTop:'100px'}}>
      <h2 className='widget__title'>WEATHER </h2>
    <div className="card shadow-lg bg-light mt-3">    
      <div className="card-body">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}
        {weather && (
          <div className="text-center">
            {/* Temperature */}
            <div className="my-5">
              <i className="fas fa-thermometer-half fa-2x text-primary"></i>
              <h5>Temperature: {weather.temperature}°C</h5>
            </div>

            {/* Wind */}
            <div className="my-5">
              <i className="fas fa-wind fa-2x text-info"></i>
              <h5>Wind Speed: {weather.windspeed} km/h</h5>
              <p><strong>Wind Direction:</strong> {weather.winddirection}°</p>
            </div>

            {/* Weather Code */}
            <div className="my-5">
              <i className="fas fa-cloud-sun fa-2x text-warning"></i>
              <h5>Weather Code: {weather.weathercode}</h5>
            </div>

            {/* Additional Details */}
            <div className="my-5">
              <i className="fas fa-clock fa-2x text-secondary"></i>
              <p>Last Updated: {new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default WeatherBar;