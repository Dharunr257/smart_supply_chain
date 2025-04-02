import axios from 'axios';

const BASE_URL = 'http://localhost:5001';

export const createProduct = async (payload) => {
  try {
    const res = await axios.post(`${BASE_URL}/products/create`, payload);
    return res.data;
  } catch (err) {
    console.error('Create API error:', err);
    return null;
  }
};

export const updateProductStatus = async (payload) => {
  try {
    const res = await axios.post(`${BASE_URL}/status/update-status`, payload);
    return res.data;
  } catch (err) {
    console.error('Update Status API error:', err);
    return err.response?.data || { message: 'Server error' };
  }
};
