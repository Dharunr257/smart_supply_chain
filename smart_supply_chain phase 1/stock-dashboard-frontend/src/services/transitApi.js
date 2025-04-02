import axios from 'axios';

export const fetchTransitList = async () => {
  const res = await axios.get('http://localhost:5000/api/transit');
  return res.data;
};
