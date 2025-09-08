import api from "../Aixos/api"
async function getUserPersonalBlogs(id , isContent = true) {
    const data = await api.post('/user/personal-blogs' , {id , isContent} , {
        headers: {
            "Content-Type" : "application/json"
        }, 
        withCredentials: true
    })
    return data
} 
export {getUserPersonalBlogs}