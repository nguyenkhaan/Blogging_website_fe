import api from '../Aixos/api'
async function getUserPersonalInformation(id) 
{
    const res = api.post('/user/personal-info' , {id} , {  //Không cần phải sử dụng JSON.stringiotfy vì axios mặc định làm giúp chúng ta vụ này khi gửi dạng json rồi 
        headers: {
            "Content-Type": "application/json", //Nếu không set Header type thì Axios sẽ dự đoán dưa theo dữ liệu bạn gửi đi / truyền vào 
        }, 
        withCredentials: 'include'
    })
    return res 
}
export {getUserPersonalInformation}