import api from "../Aixos/api";
async function updateBlog(submissionData , blogID) 
{
    console.log(submissionData) 
    const data = new FormData() 
    data.append('banner' , submissionData.banner) 
    data.append('blogID' , blogID) 
    data.append('title' , submissionData.title) 
    data.append('content' , submissionData.content) 
    const res = await api.post('/update-blog' , data , {
        headers: {
            "Content-Type": "multipart/form-data"
        }, 
        withCredentials: 'include'
    })
    return res 
} 
export {updateBlog}