import axios from "axios";
import apiConfig from "./apiConfig";

const auth = JSON.parse(localStorage.getItem('token'))

const axiosClient = axios.create({
    baseURL: apiConfig.baseURL,
    headers: {'Authorization' : 'Bearer ' + auth},
})

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }

    return response
}, (error) => {
    throw error;
})
    
    
export default axiosClient;

