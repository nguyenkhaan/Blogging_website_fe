import api from "../Aixos/api";
async function getBlogInfo(id) 
{
    const blogInfo = await api.post('/blog-info' , {id} , {
        headers: {
            "Content-Type": "application/json"
        }, 
        withCredentials: 'include'
    })
    return blogInfo
}
export {getBlogInfo}