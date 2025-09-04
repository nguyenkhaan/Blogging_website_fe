import React from 'react'
import Logo from './Logo'
function Footer() {
    return (
        <div className="w-full static bottom-0 text-base text-black h-46">
            <div className="flex h-24  items-center justify-center md:justify-between">
                <div className="flex-1 flex items-center gap-4 md:gap-2 md:text-black text-5xl md:text-base justify-center md:justify-start">
                    <i className="fa-brands fa-facebook text-blue-800"></i>
                    <i className="fa-brands fa-square-instagram text-red-700"></i>
                    <i className="fa-brands fa-square-twitter text-blue-500"></i>
                    <i className="fa-brands fa-square-x-twitter text-black"></i>
                </div>
                <Logo />
                <div className="flex-1 hidden text-black items-center md:flex justify-end">
                    nguyenkhaan@loremipsum.com
                </div>
            </div>
            <span className="block w-full px-5 text-sm pb-5 border-solid border-b-1 italic border-b-black text-center mt-4 text-black md:text-xl">Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsu</span>

        </div>
    )
}
export default Footer