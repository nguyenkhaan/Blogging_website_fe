import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import Logo from './Logo'
const quotes = [
    "Người thông minh nhất người biết mình không biết gì",
    "Anh yêu em vì em là nắng. Có cây nào thiếu nắng lại đơm bông",
    "Bất cứ khi nào bạn muốn, bạn đều có thể viết lại câu chuyện của chính mình",
    "Dù bạn đang ở đâu, hi vọng bạn sẽ tìm thấy một tia sáng rực rỡ trong cuộc đời mình",
    "Ctrl C , Ctrl V"
]
function Footer() {
    const [currentQuote, setCurrentQuote] = useState(0)
    useEffect(() => {
        const timeOutID = setTimeout(() => {
            setCurrentQuote(prev => (prev + 1) % (quotes.length))
        }, 7000)
        return () => clearTimeout(timeOutID)
    }, [currentQuote])
    return (
        <div className="w-full static bottom-0 text-base text-black h-46">
            <div className="flex h-24  items-center justify-center md:justify-between">
                <div className="flex-1 flex items-center gap-4 md:gap-2 md:text-black text-5xl md:text-base justify-center md:justify-start">
                    <a href='https://www.facebook.com/kha.an.907155'><i className="fa-brands fa-facebook text-blue-800"></i></a>
                    <a><i className="fa-brands fa-square-instagram text-red-700 cursor-pointer"></i></a>
                    <a><i className="fa-brands fa-square-twitter text-blue-500 cursor-pointer"></i></a>
                    <a> <i className="fa-brands fa-square-x-twitter text-black cursor-pointer"></i></a>
                </div>
                <Logo />
                <div className="flex-1 hidden text-black items-center md:flex justify-end">
                    nguyenkhaan@loremipsum.com
                </div>
            </div>
            <AnimatePresence mode='wait'>
                <motion.span
                    className="block w-full px-5 text-sm pb-5 text-center mt-4 text-black md:text-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                    }}
                    key={currentQuote}
                >{quotes[currentQuote]}
                </motion.span>
            </AnimatePresence>
            <span className='border-b-1 border-solid block w-full border-b-black'></span>

        </div>
    )
}
export default Footer