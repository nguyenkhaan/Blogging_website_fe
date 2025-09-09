import api from "../Aixos/api"
async function getTopUser() {
    const res = api.get('/top-home-user' , {
        headers: {
            "Content-Type" : "application/json" 
        }, 
        withCredentials: true 
    })
    return res; 
} 
export {getTopUser}