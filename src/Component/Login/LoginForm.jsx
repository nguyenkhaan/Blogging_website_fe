import React from 'react'
import ReactDOM from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Input from '../Input'
import api from '../../Aixos/api'
import { sendLoginData } from '../../Feature/sendLoginData'
import personalSlice from '../../Redux/slices/personalSlice'
import { getUserPersonalInformation } from '../../Service/getUserPersonalInformation'

function LoginForm() 
{
    const dispatch = useDispatch() 
    const [loginState, setLoginState] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        if (loginState == 1) {
            setTimeout(() => {
                navigate('/')
            }, 2000)
        }
    }, [loginState])
    const onSubmit = async (data) => {
        //Thuc hien call api 
        const {Email , Password} = data 
        try {
            if (!localStorage.getItem('loginToken')) 
            {
                const res = await sendLoginData(Email , Password) 
                .then(data => {
                    if (data.data.code == -1) onError() 
                        else {
                            const jwtToken = JSON.parse(data.data.token)
                            onSuccess(jwtToken)   //truyen token de luu vao localStorage
                        }
                }) 
            }
            else navigate('/')
        } catch (error) {
            throw new Error("Loi dang nhap")  //Dang nhap bi loi 
        }
    }

    //Tien hanh, luu du lieu vao trong Redux 
    const onSuccess = async (token) => {
        const [header , payload , signature] = token.split('.') 
        dispatch(personalSlice.actions.addInfo(JSON.parse(atob(payload))))
        const id = JSON.parse(atob(payload)).id
        localStorage.setItem('loginToken' , token)  //Luu du lieu vao trong localStorage 
         //Luu du lieu vao trong redux 
        getUserPersonalInformation(id).then((data) => {
            dispatch(personalSlice.actions.addInfo(data.data.data))   //Luu du lieu vao redux 
            console.log('>>> Data day ne: ' , data.data.data)
        })                                        
        setLoginState(1) 
        setTimeout(() => {
            navigate('/')
        }, 1800)
    }
    const onError = () => {
        setLoginState(-1);   //Đăng nhập thất bại 
    }
    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm({
        mode: 'all',  //Báo lỗi trong tất cả các trường hợp 
        reValidateMode: "all"   //validation lại một lần nữa, register: đăng kí, trong register có cascx validation rules dùng để Validation
        //Mỗi khi validation bị lỗi, nó sẽ hiển thị ra ErrorMessage Component tương ứng của ô input 
        //cùng với gọi hàm State nội bộ 
        //clearError: xóa lỗi 
    });
    return (
        <form className="flex flex-col justify-center items-center gap-6 mt-4" onSubmit={handleSubmit(onSubmit, onError)}>
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
            {/**Chuyển đến trang đặt lại mật khẩu - sẽ code sau */}
            <Link to="/"><span className="text-blue-900 underline text-lg md:text-xl mt-4">Forget your password? </span> </Link>
            <span className="text-gray-600 text-lg md:text-xl">
                Chưa có tài khoản?
                <Link to="/register"><span className="underline text-lg md:text-xl text-semibold mx-2 inline-block text-blue-900">Đăng kí ngay</span></Link>
            </span>
            {/**Button submit form*/}
            <button type="submit" className="button-primary-des-2">Đăng Nhập</button>
            <span className={`italic text-base ${(loginState > 0) ? 'text-blue-900' : 'text-red-500'}`} >{(loginState == 0) ? '' : ((loginState == 1) ? '🥰 Đăng nhập thành công 🥰' : '😞 Đăng nhập thất bại 😞')}</span>
        </form>
    )
}
export default LoginForm