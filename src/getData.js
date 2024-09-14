import axios from 'axios';

export const getData = async (city) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/weather?q=${city}&appid=${process.env.REACT_APP_API_ID}`);
        return response.data;
    } catch (error) {
        return error;
    }
};
export const getWeeklyData = async (latitude,longitude)=>
{
    try {
        const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&cnt=5&appid=${process.env.REACT_APP_API_ID}`);
        return response.data;;
    } catch (error) {
        return error;
    }
}
export const dataByCoord=async(latitude,longitude)=>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_ID}`);
        return response.data;
    } catch (error) {
        return error;
    }
}
