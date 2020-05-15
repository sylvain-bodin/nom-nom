import axios from 'axios';

const HttpClient = axios.create({
  baseURL: 'http://localhost:3000',
});

export default HttpClient;
