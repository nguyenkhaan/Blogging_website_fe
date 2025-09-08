import api from "../Aixos/api"
async function searchBlog(search) 
{
    const res = await api.post('/search-blog' , {search} , {
        headers: {
            "Content-Type": "application/json"
        }, 
        withCredentials: true
    }) 
    return res 
}   
export {searchBlog}