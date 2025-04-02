import axios from 'axios';

const BASE_URL = 'http://localhost:5000/stats';
const BASE_URL2 = 'http://localhost:5000';

export const getInventoryStats = () => axios.get(`${BASE_URL}/inventory`).then(res => res.data);
export const getTransitStats = () => axios.get(`${BASE_URL}/transit`).then(res => res.data);
export const getDeliveredStats = () => axios.get(`${BASE_URL}/delivered`).then(res => res.data);
export const getForecast = async () => {
  const res = await axios.get(`${BASE_URL2}/predict-inventory`);
  return res.data;
};