import api from "../Aixos/api";
async function updatePersonalInfo(id, payload) 
{
    const formData = new FormData; 
    formData.append('id' , payload.id) 
    formData.append('avatar' , payload.avatar || 'https://res.cloudinary.com/dikd164hg/image/upload/v1754925942/cld-sample-2.jpg')
    formData.append('name' , payload.name) 
    formData.append('old_password' , payload.old_password) 
    formData.append('new_password' , payload.new_password) 
    const res = await api.post('/update-personal' , formData , {
        headers: {
            "Content-Type": 'multipart/form-data'
        },
        withCredentials: 'include' 
    })
    return res 
}   
export {updatePersonalInfo}