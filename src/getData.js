import axios from 'axios';

export const getData = async (city) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}?q=${city}&appid=${process.env.REACT_APP_API_KEY}`);
        return response.data;
    } catch (error) {
        return error;
    }
};
