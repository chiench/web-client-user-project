import axios from "axios";

const axiosClient = axios.create({
   baseURL:import.meta.env.VITE_END_POINT_API,
   timeout: 30000,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if(token) {
        config.headers.Authorization = `Bear Token ${token}`;
    }
    return config
});

axiosClient.interceptors.response.use((response) => {
    console.log(response, 'response trong config')
    return response
}, (error) =>{
    if(error.response.status === 402) {
        localStorage.removeItem('ACCESS_TOKEN')
    }
    console.log(error, ' error trong config')
    return Promise.reject(error);
})

export default axiosClient