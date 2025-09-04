import React from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion';
import Slider from '../Component/Slider';
import TopBlog from '../Component/Home/TopBlog';
import Section4 from '../Component/Home/Section_4';
import Form from '../Component/Home/Form';
import withTransition from '../Service/Transition';
const slides = [
    "http://localhost:5173/Image/background-slider-1.jpg",
    "http://localhost:5173/Image/background-slider-2.jpg",
    "http://localhost:5173/Image/background-slider-3.jpg"
];
const topBlogData = [  //Dữ liệu cho section3, bộ 3 Blog nổi tiếng 
    {
        title: 'Viet Blog that de dang',   //title 
        subblog: [  //title của các blog con liên quan 
            'Hoc viet blog voi toi #1',
            'Hoc viet blog voi toi #2'
        ]
    },
    {
        title: 'Viet Blog that de dang',
        subblog: [
            'Hoc viet blog voi toi #1',
            'Hoc viet blog voi toi #2'
        ]
    },
    {
        title: 'Viet Blog that de dang',
        subblog: [
            'Hoc viet blog voi toi #1',
            'Hoc viet blog voi toi #2'
        ]
    },
]
function Home() {
    //1. navbar 2. Slider 3. Section 3 - Blogs 4. Section4  5. Section 5 - Form 
    return (
        <div className='w-full'>
            <div className="content">
                <Slider slides={slides} />
            </div>
            <div className="content ">
                <TopBlog blogs={topBlogData} />
            </div>
            <motion.div
                className="content bg-gray-200 hidden lg:block"
                initial={{ opacity: 0, x: '-100%' }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Section4 />
            </motion.div>
            <motion.div
                className="content"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Form />
            </motion.div>
        </div>
    )
}
export default withTransition(Home); 