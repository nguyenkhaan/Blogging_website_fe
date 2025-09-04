import React from 'react'
import ReactDOM from 'react-dom'
function Item() {
    return <div className="h-full text-base font-sans w-full ">
        <div className="w-full bg-cover bg-center bg-gray-300 bg-no-repeat h-1/2">

        </div>
        <div className = "w-full shadow-[6px_6px_12px_rgba(0,0,0,0.4)] min-h-1/2">
            <div className="py-4 w-full flex items-center justify-center">
                <button className="hover:text-white hover:bg-black transition-all duration-300 cursor-pointer ease-in-out rounded-none border-1 border-solid border-black py-1 px-7 bg-transparent font-semibold">LOREM</button>
            </div>
            <div className="w-full text-center py-2 px-6">
                Lorem Ipsum is simply dummy text
                of the printing and typesetting
                industry. Lorem Ipsum has
                been the industry's
            </div>

        </div>
    </div>
}
export default Item