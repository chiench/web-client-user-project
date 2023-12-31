import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_END_POINT_API,
  timeout: 30000,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (token) {
    config.headers.Authorization = `Bear Token ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      alert(`${error.message} or Error Serve`);
    }
    if (error.response && error.response.status === 403) {
      if (
        !confirm(
          "Bạn khônng được phép truy cập, muốn ở lại thì chọn ok nếu ấn cancel thì cook"
        )
      ) {
        localStorage.removeItem("ACCESS_TOKEN");
        window.location.reload();
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosClient;
