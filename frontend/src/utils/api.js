
import axios from 'axios';
const API = axios.create({
    // baseURL:import.meta.env.BACKEND_URI,
    baseURL:'http://localhost:5000/api',
    withCredentials:true 
})
export default API;