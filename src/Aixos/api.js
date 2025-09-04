import axios from "axios"; 
const api = axios.create({
    baseURL: 'http://localhost:6869'
})
export default api