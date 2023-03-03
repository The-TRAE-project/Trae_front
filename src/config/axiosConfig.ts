import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_BACK_PROD_API_URL
    : import.meta.env.VITE_BACK_DEV_API_URL,
});

export default instance;
