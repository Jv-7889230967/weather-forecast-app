import '../App.css'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
export default function WeeklyData({ weeklyData }) {
  console.log(weeklyData)
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          5 Days Forecast
        </AccordionSummary>

        <AccordionDetails>
          <div style={{height:'fit',width:'full',display:'flex',flexDirection:'column'}}>
            {
              weeklyData?.map((data) => {
                const currDate=new Date(data.dt_txt);
                return (
                  <ul style={{listStyle:'none'}} key={data.dt}>
                    <h2 style={{fontSize:'14px',}}>{`${currDate.getDate()},${currDate.getMonth()},${currDate.getFullYear()}`}</h2>
                    <li>Temperature-{(data.main.temp-273.15).toFixed(2)} *C</li>
                    <li>Weather-{data.weather[0].description}</li>
                    <li>Max_Temp-{(data.main.temp_max-273.15).toFixed(2)} *C</li>
                    <li>Min_Temp-{(data.main.temp_min-273.15).toFixed(2)} *C</li>
                  </ul>

                )
              })
            }
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
