import './App.css';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { getData, getWeeklyData } from './getData';
import { useState } from 'react';
import WeatherTimeline from './components/Timeline';
import Loader from './components/Loader';
import WeeklyData from './components/WeeklyData';

const ariaLabel = { 'aria-label': 'description' };
function App() {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState('')
  const [data, setData] = useState({
    weather: '',
    temperature: '',
    windspeed: '',
    humidity: '',
  })
  const [weeklyData, setWeeklyData] = useState([]);


  const Handleclick = async () => {
    try {
      setLoading(true);
      const currWeather = await getData(city);
      const weekData = await getWeeklyData(currWeather.coord.lat, currWeather.coord.lon);
      setData({
        city: currWeather.city,
        weather: currWeather.weather[0].description,
        temperature: (currWeather.main.temp - 273.15).toFixed(2),
        windspeed: currWeather.wind.speed,
        humidity: currWeather.main.humidity,
      })
      setWeeklyData(weekData.list);
      // console.log(weekData.list)
      setShow(true);
    } catch (error) {
      setLoading(false);
      setError(error);
      setShow(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <div className='container'>
        <h3 style={{fontSize:'30px'}}>Weather Forecast</h3>
        <div className='input-container'>
          <Input placeholder="Enter Location" inputProps={ariaLabel} onChange={(e) => { setCity(e.target.value) }} />
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
                  <WeeklyData weeklyData={weeklyData}/>
                </>
              ) : (
                error ? (
                  <p>{error.message}</p>
                ) :
                  <p>Please enter a locaiton</p>
              )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
