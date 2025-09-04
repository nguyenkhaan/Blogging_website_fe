//Thẻ Input sử dụng chung cho Login và Register 
import React from 'react'
import ReactDOM from 'react-dom'
import { useState } from 'react'
import { ErrorMessage } from '@hookform/error-message'
import { validationRules as rules } from '../Service/getValidationRules'  //Import rules cho từng trường 

function Input({
    placeholder = 'Enter',
    name,
    handleInput //handleInput chính là useForm được truyền vào để xử lí Form 
}) {
    //Chức năng ẩn / hiện mật khẩu 
    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassWordClick = () => {
        console.log('Re-render')
        if (name == "Password") setShowPassword(!showPassword)
    }


    //Chức năng ẩn / hiện mật khẩu 
    //Truong nay khong duoc de trong, dung dinh dang gmail, 
    const { register, errors, clearErrors } = handleInput;
    const rule = rules[name] //Lấy ra rule tương ứng với name 
    return (
        <div className="flex justify-start items-start flex-col">
            <label htmlFor={name} className=
                "text-base text-gray-600 mb-2">{name.replace(/_/g, ' ')}:</label>
            <div className="relative">
                <input
                    placeholder={placeholder}
                    className="text-gray-600 rounded-lg w-90 md:w-120 text-base md:text-lg bg-gray-300 py-2 md:py-4 px-4 outline-0 relative"
                    id={name}  //Gán id để sử dụng trong 1 số trường hợp. Ví dụ lấy value của trường cho dễ
                    //Tùy vào từng trường hợp và trạng thái có showPassword không để chuyển đổi style 
                    type={name === 'Password' ? (showPassword ? 'text' : 'password') : name === 'Password_again' ? 'password' : 'text'}

                    {...register(name, rule)}
                // onChange={() => clearErrors(name)}
                // onFocus={() => clearErrors(name)}   Tại vì xóa lỗi quá sớm nên không thể thấy được sự xuất hiện của lỗi 
                >

                </input>
                {/* show password icons, khi showPassword state la true, nó hiện ra icon show password
                Khi showPasswordState = false thì re-render lại và hiện ra icon non-show. Đồng thời chyển đổi logic 
                type của input thành password hoặc text thùy thuộc vào tình trạng state */}
                <div className={`${(name === "Password") ? "block" : "hidden"} absolute right-3 top-1/2 -translate-y-1/2 -translate-x-2 text-xl cursor-pointer text-blue-950`}>
                    {(showPassword) ? <i class="fa-solid fa-eye" onClick={handleShowPassWordClick}></i> : <i class="fa-solid fa-eye-slash" onClick={handleShowPassWordClick}></i>}
                </div>
            </div>
            {/**Thẻ hiển thị lỗi khi người dùng nhập giá trị không hợp lệ vào Input */}
            <ErrorMessage
                errors={errors}
                name={name} 
                // Ten ma chung ta da thuc hien dang ki voi the input
                render={({ message }) => {
                    return <p className="text-red-400 italic text-sm mt-1">*{message}*</p>
                }}
            />
        </div>
    )
}
export default Input