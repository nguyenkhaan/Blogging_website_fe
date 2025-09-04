import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
const navbarChoices = [
    {
        path: '/',
        title: 'MỚI NHẤT'
    },
    {
        path: '/category',
        title: 'DANH MỤC'
    },
    {
        path: '/series',
        title: 'SERIES'
    },
    {
        path: '/trending',
        title: 'TRENDING'
    },
    {
        path: '/blogger',
        title: 'BLOGGER'
    }
]
function MenuList() {
    return (
        <>
            {navbarChoices.map((choice) => {
                return (
                    <Link to= {choice.path} className="max-md:w-full max-md:block">
                        <motion.li
                            className="max-md:w-full py-3 max-md:font-semibold max-md:text-white text-center max-md:hover:bg-blue-600 transition-colors duration-300"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            {choice.title}
                        </motion.li>
                    </Link>
                )
            })}
        </>
    )
}
export default MenuList
//Thực hiện gom nhóm code lại bằng cách sử dụng array 

/*
            <Link to="/" className="max-md:w-full max-md:block">
                <motion.li
                    className="max-md:w-full py-3 max-md:font-semibold max-md:text-white text-center max-md:hover:bg-blue-600 transition-colors duration-300"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3, ease:"easeInOut" }}
                >
                    Home
                </motion.li>

            </Link>
            <Link to="/blog" className="max-md:w-full max-md:block">
                <motion.li
                    className="max-md:w-full py-3 max-md:font-semibold max-md:text-white text-center max-md:hover:bg-blue-600 transition-colors duration-300"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                >
                    Blogs
                </motion.li>

            </Link>
            <Link to="/login" className="max-md:w-full max-md:block">
                <motion.li
                    className="max-md:w-full py-3 max-md:font-semibold max-md:text-white text-center max-md:hover:bg-blue-600 transition-colors duration-300"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                >
                    Login
                </motion.li>
            </Link>
            <Link to="/dashboard" className="max-md:w-full max-md:block">
                <motion.li
                    className="max-md:w-full py-3 max-md:font-semibold max-md:text-white text-center max-md:hover:bg-blue-600 transition-colors duration-300"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                >
                    Dashboard
                </motion.li>
            </Link>
            <Link to="/" className="max-md:w-full max-md:block">
                <motion.li
                    className="max-md:w-full py-3 max-md:font-semibold max-md:text-white text-center max-md:hover:bg-blue-600 transition-colors duration-300"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                >
                    Announcements
                </motion.li>
            </Link>



*/