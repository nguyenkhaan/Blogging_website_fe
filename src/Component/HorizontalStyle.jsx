import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import MenuList from './MenuList'
import Logo from './Logo'
import { useLocation } from 'react-router-dom'

function HorizontalStyle() {
    const [searchInput, setSearchInput] = useState('');
    const { pathname } = useLocation();

    return (
        <div className=" text-lg w-full hidden md:flex justify-between items-center md:justify-between h-20 md:h-24 px-4 md:px-12 gap-3 ">
            <div className="flex-1 hidden md:flex justify-start">
                <Logo path="Image/Logo.png" />
            </div>
            <div className="flex-3 text-black relative">
                <i className="fa-solid fa-bars md:!hidden block"></i>
                <ul className="hidden p-0 absolute md:flex items-center md:justify-between gap-4 md:gap-7 md:relative">
                    <MenuList />
                </ul>
            </div>
            <div className={`${pathname.includes('/search') && 'hidden'} flex-1 text-black flex justify-end items-center gap-2 border-1 rounded-[5px] overflow-hidden`}>
                <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className='outline-none  w-full px-2 text-[13px]' placeholder='Search for blog ' />
                <Link to={`/search?search=${searchInput}&blogType=all&order=none`} className='w-10 h-10 shrink-0 flex items-center justify-center hover:opacity-90 text-white bg-[#193CB8] duration-100 cursor-pointer'>
                    <i className="fa-solid fa-magnifying-glass "></i>
                </Link>
            </div>
        </div>

    )
}
export default HorizontalStyle