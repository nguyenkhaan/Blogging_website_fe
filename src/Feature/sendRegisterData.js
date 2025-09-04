import api from "../Aixos/api";

async function sendReigsterData(email , password) {
    const data = {email , password}
    const res = await api.post('/register' , JSON.stringify(data) , {
        headers: {
            "Content-Type": "application/json"
        }, 
        withCredentials: 'include'
    })  //Promise 
    return res 
} 
export {sendReigsterData}