import React from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { useScroll } from 'framer-motion'
import { useSpring } from 'framer-motion'
function Scroll()
{
    const {scrollYProgress} = useScroll(); 
    const springScrollYProgess = useSpring(scrollYProgress , {
        mass: 1.2, 
        stiffness: 80, 
        damping: 20, 
        duration: 0.2, 
        restDelta: 0.001
    })
    return (
        <motion.div
            className = "bg-blue-800 fixed top-0 left-0 right-0 w-screen"
            style = {{
                scaleX: springScrollYProgess, 
                transformOrigin: '0%', 
                height: 4,
                zIndex: 99999 //9*10^5 sẽ đại diện cho một giá trị rất lớn 
            }}
        >

        </motion.div>
    )
}
export default Scroll