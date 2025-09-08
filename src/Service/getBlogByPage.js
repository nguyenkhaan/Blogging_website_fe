import api from "../Aixos/api";
async function getBlogByPage(page) 
{
    const res = await api.post('/get-blog-by-page' , {page} , {
        headers: {
            "Content-Type" : "application/json"
        }, 
        withCredentials: true 
    }) 
    return res
} 
export {getBlogByPage}