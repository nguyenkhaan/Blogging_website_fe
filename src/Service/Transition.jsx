//Hỗ trợ hiệu ứng chuyển trang 
import React from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
function withTransition(PageComponent) {
    return function Transition() {   //Bởi vì trong các trange Page, nó chưa thực sự trả về 1 React Component, nên nếu chúng ta chỉ có 1 cấ function 
        //thì sẽ gọi thằng Transition(Page) (đây là 1react compoennt rồi), nên chúng ta hãy dùng higher order function để tránh điều trên, bọc thêm 1 function bên ngoài nữa 
        return (
            <AnimatePresence mode = "wait">
                <motion.div
                    className="max-w-[1280px] min-h-screen"
                    initial={{ opacity: 0 , x: "-100%"}}
                    animate={{ opacity: 1 , x: 0}}
                    exit={{ opacity: 0 , x: "100%"}}
                    transition={{ duration: 0.5 , ease: "easeIn"}}
                >
                    <PageComponent />
                </motion.div>
            </AnimatePresence>
        )
    }
}

export default withTransition