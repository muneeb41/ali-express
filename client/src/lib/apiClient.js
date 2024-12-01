import axios from "axios";
import { HOST } from '../utils/constants.js';


const apiClient = axios.create({
    baseURL: HOST,
    withCredentials: true, // Include cookies in requests
})


export default apiClient;