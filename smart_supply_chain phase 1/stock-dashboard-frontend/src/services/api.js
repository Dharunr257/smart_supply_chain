import axios from 'axios';
const BASE_URL = 'http://localhost:5000';

// Inventory List
export const getInventory = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/inventory`);
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch inventory: " + error.message);
  }
};

// Delivered List
export const getDeliveredItems = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/delivered`);
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch Delivered stocks: " + error.message);
  }
};

// Find Stock
export const findStock = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/stock/${id}`);
    return res.data;
  } catch (error) {
    return null;
  }
};

// Track Stock
export const trackStock = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/track/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch tracking data: " + error.message);
  }
};

// ✅ Transit List
export const getTransitList = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/transit`);
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch transit list: " + error.message);
  }
};
