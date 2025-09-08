import api from "../Aixos/api";

async function sendLoginData(email , password) 
{
    const dataSent = {
        email, 
        password 
    }
    const res = await api.post('/login' , JSON.stringify(dataSent) , {
        headers: {
            "Content-Type" : "application/json"
        }, 
        withCredentials: true 
    })
    return res 
}
export {sendLoginData}