import axios from 'axios';

const HttpClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: process.env.WITH_CREDENTIAL || false,
});

export default HttpClient;
