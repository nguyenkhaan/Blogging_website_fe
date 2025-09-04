import React from 'react'
import ReactDOM from 'react-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import MenuList from './MenuList'

function VerticalStyle() {
    const [show, setShow] = useState(false);
    return (
        <div className=" text-lg w-full md:hidden flex bg-blue-800 relative justify-between items-center md:justify-between h-18 md:h-24 px-4 md:px-12 ">

            <div className="flex-1 text-black flex justify-start">
                <i className="fa-solid text-white cursor-pointer fa-bars md:!hidden" onClick={() => setShow(!show)}></i>
            </div>
            <AnimatePresence mode="wait">
                {show &&

                    <motion.ul
                        key="dropdown"
                        className="flex flex-col top-full z-99999 left-0 bg-blue-800 w-full justify-center p-0 text-lg absolute items-center"
                        initial={{  y: '-12%' }}
                        animate={{  y: '0' }}
                        exit={{   y: '-12%' }}
                        transition={{ duration: 0.3 }}
                    >
                        <MenuList />
                    </motion.ul>
                }
            </AnimatePresence>
            <div className="flex-1 text-white flex pr-2 justify-end">
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>
        </div>

    )
}
export default VerticalStyle