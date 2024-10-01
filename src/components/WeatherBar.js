import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';

const WeatherBar = () => {
  const [weather, setWeather] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationError, setLocationError] = useState(null);

  // Fetch weather data using dynamic latitude and longitude
  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      setWeather(response.data.current_weather);
    } catch (error) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch location name using reverse geocoding
  const fetchLocationName = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      setLocationName(response.data.address.city || response.data.address.town || response.data.address.village || 'Unknown Location');
    } catch (error) {
      setLocationName('Unknown Location');
    }
  };

  // Get user's location using the Geolocation API
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);  // Fetch weather data with user's location
          fetchLocationName(latitude, longitude);  // Fetch location name
        },
        (error) => {
          setLocationError('Unable to retrieve your location');
          setLoading(false);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser');
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className='container' style={{marginTop: '100px'}}>
      <h2 className='widget__title'>WEATHER</h2>
      <div className="card shadow-lg bg-light mt-3">    
        <div className="card-body">
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-danger">{error}</p>}
          {locationError && <p className="text-center text-danger">{locationError}</p>}
          {weather && (
            <div className="text-center">
              {/* Location Name */}
              <div className="my-5">
                <i className="fas fa-map-marker-alt fa-2x text-danger"></i>
                <h5>Location: {locationName}</h5>
              </div>

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
