import React from 'react'
import ReactDOM from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import Input from '../Input'
import { sendReigsterData } from '../../Feature/sendRegisterData'
//Note
/*
0: Chưa làm gì hết 
1: Đăng nhập thành công 
-1: Đăng nhập thất bại 
-2: Mật khẩu không khớp 
*/
function RegisterForm() {
    const [registerState, setRegisterState] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        if (registerState == 1) {
            const timeOutID = setTimeout(() => {
                navigate('/')
            }, 2000)
            return () => clearTimeout(timeOutID)
        }
    }, [registerState])
    const onSubmit = async (data) => {
        if (document.getElementById('Password').value != document.getElementById('Password_again').value) {
            setRegisterState(-2);   //Nếu như 2 mật khẩu nhập lại không khớp nhau thì đăng nhập thất bại - Mật khẩu không khớp 
            return;
        }
        try {
            if (!localStorage.getItem('loginToken'))
            {
                const {Email , Password} = data 
                const res = await sendReigsterData(Email , Password) 
                .then(data => {
                    if (data.data.code < 0) onError() 
                        else onSuccess() 
                })
            }
        } catch (error) {
            throw new Error("Loi dang ki")
        }
        console.log(data);  //hiển thị thông tin gửi về 
    }
    const onSuccess = () => {
        setRegisterState(1) 
        setTimeout(() => {
            navigate('/')
        } , 1800)
    }
    const onError = () => {
        setRegisterState(-1);   //Đăng ký thất bại 
    }
    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm({
        mode: 'all',  //Báo lỗi trong tất cả các trường hợp 
        reValidateMode: "all"   //validation lại một lần nữa, register: đăng kí, trong register có cascx validation rules dùng để Validation
        //Mỗi khi validation bị lỗi, nó sẽ hiển thị ra ErrorMessage Component tương ứng của ô input 
        //cùng với gọi hàm State nội bộ 
        //clearError: xóa lỗi 
    });
    return (
        <form className="flex flex-col justify-center items-center gap-6 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
                placeholder="✉️ Email"
                name="Email"
                handleInput={{ register, errors, clearErrors }}    //Truyền các thuộc tính cần thiểt để xử lí input của useForm vào    
            />
            <Input
                placeholder="⚷ Password"
                name="Password"
                handleInput={{ register, errors, clearErrors }}
            />
            <Input
                placeholder="⚷ Enter your Password again"
                name="Password_again"
                handleInput={{ register, errors, clearErrors }}
            />
            <span className="text-gray-600 text-lg md:text-xl">
                Đã có tài khoản?
                <Link to="/login"><span className="underline text-lg md:text-xl text-semibold mx-2 inline-block text-blue-900">Đăng nhập</span></Link>
            </span>
            {/**Button submit form*/}
            <button type="submit" className="button-primary-des-2">Đăng kí</button>
            <span className={`italic text-base ${(registerState > 0) ? 'text-blue-900' : 'text-red-500'}`} >{(registerState == 0) ? '' : ((registerState == 1) ? '🥰 Đăng kí thành công 🥰' : ((registerState == -1) ? '😞 Đăng kí thất bại 😞' : 'Mật khẩu nhập lại không khớp'))}</span>
        </form>
    )
}
export default RegisterForm