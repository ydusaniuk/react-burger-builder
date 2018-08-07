import axios from 'axios';

export const axiosOrders = axios.create({
  baseURL: 'https://react-burger-builder-1e4b9.firebaseio.com/',
});
