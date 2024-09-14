import './App.css';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { getData, getWeeklyData } from './getData';
import { useState, useEffect } from 'react';
import WeatherTimeline from './components/Timeline';
import Loader from './components/Loader';
import WeeklyData from './components/WeeklyData';

const ariaLabel = { 'aria-label': 'description' };
const LOCAL_STORAGE_KEY = 'lastSearchedLocation';
const EXPIRATION_TIME = 60 * 60 * 24 * 1000; // 24 hours

function App() {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState({
    weather: '',
    temperature: '',
    windspeed: '',
    humidity: '',
  });
  const [weeklyData, setWeeklyData] = useState([]);

  // Function to get the last searched location from localStorage
  const getSavedLocation = () => {
    const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (savedData && Date.now() - savedData.timestamp < EXPIRATION_TIME) {
      return savedData.city;
    }
    return null;
  };

  // Function to save the searched location with timestamp
  const saveLocation = (city) => {
    const locationData = { city, timestamp: Date.now() };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(locationData));
  };

  // Function to handle the search click
  const Handleclick = async () => {
    if (!city.trim()) {  // Check if the city input is empty or just whitespace
      setError({ message: 'Please enter a valid location' });
      setShow(false);
      return;
    }
    try {
      console.log('called');
      setError(''); // Reset any previous errors
      setLoading(true);
      const currWeather = await getData(city);
      const weekData = await getWeeklyData(currWeather.coord.lat, currWeather.coord.lon);
      setData({
        city: currWeather.name,
        weather: currWeather.weather[0].description,
        temperature: (currWeather.main.temp - 273.15).toFixed(2),
        windspeed: currWeather.wind.speed,
        humidity: currWeather.main.humidity,
      });
      setWeeklyData(weekData.list);
      setShow(true);
      saveLocation(city); // Save the location to localStorage
    } catch (error) {
      setLoading(false);
      setError(error);
      setShow(false);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const fetchWeatherOnLoad = async () => {
      const savedCity = getSavedLocation();
      if (savedCity) {
        setCity(savedCity);
        await Handleclick();
      }
    };
  
    fetchWeatherOnLoad(); 
  }, []);

  return (
    <div className="App">
      <div className='container'>
        <h3 style={{ fontSize: '30px' }}>Weather Forecast</h3>
        <div className='input-container'>
          <Input placeholder="Enter Location" inputProps={ariaLabel} value={city} onChange={(e) => { setCity(e.target.value) }} />
          <Button variant="contained" onClick={Handleclick}><SearchIcon /></Button>
        </div>
        <div className='data-container'>
          {
            loading ? (
              <Loader />
            ) :
              show ? (
                <>
                  <WeatherTimeline {...data} />
                  <WeeklyData weeklyData={weeklyData} />
                </>
              ) : (
                error ? (
                  <p>{error.message}</p>
                ) :
                  <p>Please enter a location</p>
              )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
