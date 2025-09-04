import React from 'react'
import ReactDOM from 'react-dom'
import { useForm } from 'react-hook-form'
import sendAdsEmail from '../../Service/sendAdsEmail';
import { onSuccess } from '../../Service/callingToast';
function Form() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        sendAdsEmail(data.email)
        onSuccess("Email sent successfully");
        console.log(data);
    }
    return (
        <>
            <h2 className="md:py-12 md:pt-16 text-3xl pt-12 py-8 md:text-4xl font-light block w-full text-center">
                LOOKING FOR MORE INFORMATION?
            </h2>
            <div className="flex px-8 items-center text-base justify-center">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="md:flex flex px-8 md:p-0 flex-col md:flex-row items-end md:items-center mx-auto gap-y-4 md:gap-6 text-base justify-center md:justify-evenly"
                >
                    <input
                        {...register("email")}
                        className="border-none w-86 text-sm md:text-base md:w-90 h-12 bg-gray-200 p-4"
                        placeholder='Enter your email ^^'
                    ></input>
                    <button type="submit" className="bg-blue-800 hover:opacity-80 transition-all duration-300 text-sm ease-in-out cursor-pointer font-semibold p-4 md:text-base text-white text-center h-12 flex items-center justify-center">Send me</button>
                </form>

            </div>
            <span className="md:pb-16 pb-10 md:pt-8 pt-4 block text-center italic w-full text-sm md:text-base ">Do you want to receive a small introduction about this website?</span>
        </>
    )
}
export default Form