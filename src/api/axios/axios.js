import axios from 'axios';
import { Cookies } from 'react-cookie';


export const baseURL = 'https://online-appointment-booking-for-doctors.onrender.com';

export const AxiosInstance = axios.create({
    baseURL,
})


const cookie = new Cookies();

AxiosInstance.interceptors.request.use(
  async function (config) {
     const token = cookie.get("token") ;
    if (token !== null || token !== undefined) {
      config.headers["x-access-token"] = token;
    }
    return config;

  },
  function (err) {
    return Promise.reject(err);
  }
);