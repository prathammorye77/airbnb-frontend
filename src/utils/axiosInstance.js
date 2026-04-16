import axios from "axios";
const API = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL:'http://localhost:8080',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🔥 RESPONSE INTERCEPTOR (handle errors globally)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🔥 AUTO LOGOUT ON 401
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
