import api from "../Aixos/api";

async function deleteUserPersonalBlog(blogID , userID) {
    const res = await api.post('/delete-personal-blog' , {blogID , userID} , {
        headers: {
            "Content-Type" : "application/json"
        }, 
        withCredentials: 'include'
    })
    return res 
}
export {deleteUserPersonalBlog}