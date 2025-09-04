import api from "../Aixos/api";
async function sendBlog(submissionData , id) 
{
    const data = new FormData; 
    data.append('title' , submissionData.title) 
    data.append('content' , submissionData.content) 
    const file = submissionData.banner   //Khong tu hien thi ra chuoi base64 hoac nhi phan vi se rat lon 
    data.append('banner', file)
    data.append('userID' , id) //ID cua nguoi viet - gui kem chung len server 
    const res = await api.post('/blog-upload' , data , {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return res 
}
export {sendBlog}