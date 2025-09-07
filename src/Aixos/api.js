import axios from "axios"; 
const api = axios.create({
    baseURL: 'https://blogging-website-be.onrender.com', 
    withCredentials: true
})
export default api