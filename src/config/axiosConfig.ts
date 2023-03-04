import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://195.80.51.155:8088/api',
});

export default instance;
