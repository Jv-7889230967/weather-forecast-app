import axios from 'axios';

export const getData = async (city) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=77c0a6cc830c4b4da3db92e032708f40`);
        return response.data;
    } catch (error) {
        return error;
    }
};
