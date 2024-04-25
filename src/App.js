import './App.css';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { getData } from './getData';
import { useState } from 'react';
import WeatherTimeline from './Timeline';

const ariaLabel = { 'aria-label': 'description' };
function App() {
  const [city,setCity]=useState('');
  const [weather,setWeather]=useState('');
  const [temperature,setTemperature]=useState('');
  const [windspeed,setWindSpeed]=useState('');
  const [humidity,setHumidity]=useState('');
  const [show,setShow]=useState(false);
  const [error,setError]=useState('');
  var props={
    weather:weather,
    temperature:temperature,
    windspeed:windspeed,
    humidity:humidity
  }


  const Handleclick=async()=>{
    try {
      const response=await getData(city);
      const celiustemp=response.main.temp-273.15;
      setWeather(response.weather[0].description);
      setTemperature(celiustemp.toFixed(1));
      setWindSpeed(response.wind.speed);
      setHumidity(response.main.humidity);
      setShow(true);
    } catch (error) {
      setError(error);
      setShow(false);
    }
  }
  return (
    <div className="App">
      <div className='container'>
        <h3>Weather Forecast</h3>
    <div className='input-container'>
      <Input placeholder="Enter Location" inputProps={ariaLabel} onChange={(e)=>{setCity(e.target.value)}} />
      <Button variant="contained" onClick={Handleclick}><SearchIcon/></Button>
    </div>
    <div className='data-container'>
     {show ?<WeatherTimeline {...props} />:<p>Please enter a valid place</p>}
    </div>
      </div>
    </div>
  );
}

export default App;
