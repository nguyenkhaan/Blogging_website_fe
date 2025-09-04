import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import RegisterForm from '../Component/Register/RegisterForm';
import { FaGooglePlusG, FaFacebook, FaGithub, FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';
function Register() {
    useEffect(() => {
        document.getElementById('root').classList.add("full-screen-page");
        return (() => document.getElementById('root').classList.remove('full-screen-page'));
    }, [])
    return (
        <div className="w-full h-screen relative items-center justify-center flex">
            {/* Icon trở về trang chủ, hiện khi là điện thoại  */}
            <Link to="/"> <FaHome className="absolute top-6 text-blue-900 cursor-pointer left-6 text-4xl block lg:hidden " /> </Link>
            {/* Nửa bên trái - Background */}
            <div className="flex-1 h-full bg-no-repeat hidden bg-cover gap-6 bg-center bg-gradient-to-b from-blue-900 to-blue-950 lg:flex flex-col justify-center items-center">
                <h1 className="md:text-3xl lg:text-5xl text-white font-bold">Hello Friends</h1>
                <p className="text-base lg:text-lg font-medium text-center text-white">Enter you personal detail and start a jopurney with us</p>
                <Link to="/" ><button className="button-primary-des-1 max-lg:px-12 " >GO BACK HOME</button> </Link>
            </div>

            {/* Nửa bên phải - Form đăng nhập */}
            <div className="flex-2 h-full flex bg-gray-100 flex-col items-center justify-center">
                <h1 className="text-5xl font-semibold text-blue-900 mb-6 ">Sign up</h1>
                <RegisterForm />
            </div>
        </div>
    );
}
export default Register