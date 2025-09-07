import axios from 'axios';


export const baseURL = 'https://online-appointment-booking-for-doctors.onrender.com';

export const AxiosInstance = axios.create({
    baseURL,
})



AxiosInstance.interceptors.request.use(
  async function (config) {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");
    if (token !== null || token !== undefined) {
      config.headers["x-access-token"] = token;
    }
    return config;

  },
  function (err) {
    return Promise.reject(err);
  }
);