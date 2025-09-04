import React from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import Item from './Item'
function Section4() {
    return (
        <div>
            <h2 className = "md:py-16 py-10 font-md text-3xl md:text-4xl text-center w-full">OUR FAMOUS BLOGS</h2>
            <div className="px-14 pb-12 w-full min-h-80 grid grid-cols-16 gap-x-4 gap-y-6">
                <div className="md:col-span-4 col-span-16 h-94">
                    <Item />
                </div>
                <div className="md:col-span-4 col-span-16 h-94">
                    <Item />
                </div>
                <div className="md:col-span-4 col-span-16 h-94">
                    <Item />
                </div>
                <div className="md:col-span-4 col-span-16 h-94">
                    <Item />
                </div>
                <div className="md:col-span-4 hidden md:block col-span-8 h-94">
                    <Item />
                </div>
                <div className="md:col-span-4 hidden col-span-8 md:block h-94">
                    <Item />
                </div>
                <div className="md:col-span-4 hidden col-span-8 md:block h-94">
                    <Item />
                </div>
                <div className="md:col-span-4 hidden col-span-8 md:block h-94">
                    <Item />
                </div>
            </div>
        </div>

    )
}
export default Section4