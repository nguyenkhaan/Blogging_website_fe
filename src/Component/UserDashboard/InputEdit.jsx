import React, { useState, useEffect } from "react";
import { validationRules } from "../../Service/getValidationRules";
import { ErrorMessage } from "@hookform/error-message";
function getRules(name , required = '') 
{
    let rules = {}; 
    if (name === 'old_password' || name === 'new_password')
    {
        rules = {...validationRules['Password']}
    }
    //Ten dang nhap thi khong co dieu luat gi qui dinh 
    if (required) 
    {
        rules.validate = (value) => {
            return value === required || "Mật khẩu nhập vào không hợp lệ"
        }
    }
    delete rules.required 
    return rules 
}

export default function InputEdit({ name, label, handleInput , type , value}) {  
    //value la gia tri co san, fetch tu database
    //name: ten the, dung de in ra form 
    //handleInput: chua register 
    //type: loai the input: text / password / file 
    const {register , errors , clearErros } = handleInput 
    const [valueInput , setValueInput] = useState(value) 
    let rules = (name === 'old_password')?  getRules(name , valueInput) :  getRules(name) 
    const handleValueInput = (e) => {
        setValueInput(e.target.value) 
    }
    useEffect(() => {
        setValueInput(value) //Khi value duoc thay doi thi tien hanh re-render 
    } , [value])
    return (
        <div className="flex flex-col my-2 justify-start flex-1 gap-2">
            <label className="font-bold text-base">{label}: </label>
            <input
                type={type}
                className="text-base text-gray-800 rounded-md px-2 py-2.5 border-2 border-solid border-gray-500"
                {...register(name , rules)}
                value = {(valueInput && type != 'password')? valueInput : ''}
                onChange={handleValueInput}
            />
            {(name === 'old_password')? 
                <ErrorMessage 
                    errors={errors}
                    name={name} 
                    render={({message}) => {
                        return <span className = "text-red-500 text-sm italic">*{message}*</span>
                    }}
                />
            : ''}
            {(name === 'new_password')? 
                 <ErrorMessage 
                    errors={errors}
                    name={name} 
                    render={({message}) => {
                        return <span className = "text-red-500 text-sm italic">*{message}*</span>
                    }}
                />
            : ''}
        </div>
    );
}
