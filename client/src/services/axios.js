import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});


// Add JWT token automatically
axiosInstance.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }


        // If request body is FormData,
        // DON'T manually set Content-Type.
        // Browser will set:
        // multipart/form-data; boundary=...
        if (config.data instanceof FormData) {

            delete config.headers["Content-Type"];

        } else {

            // Normal JSON request
            config.headers["Content-Type"] = "application/json";

        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


export default axiosInstance;