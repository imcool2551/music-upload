import axios from 'axios';

export default axios.create({
  //  baseURL: 'https://artists.wsangwook.com/', // prod
  baseURL: 'http://localhost:8000/', // dev
  withCredentials: true,
});
