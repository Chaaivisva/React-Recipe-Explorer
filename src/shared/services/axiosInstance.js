import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('Token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }

        console.log("Request Config:", config);
        return config;
    },
    (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response){
            const message = error.response.data.message || 'An error occurred';

            if(error.response.status === 401){
                localStorage.clear();
                window.location.href = '/login';
            }
            return Promise.reject(new Error(message));
        }

        if(error.request){
            return Promise.reject(new Error('Network error occurred')); 
        }

        return Promise.reject(new Error('An unexpected error occurred'));
    }
);


export default axiosInstance;