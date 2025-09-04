import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from '../Component/Navbar'
import Footer from '../Component/Footer'

export default function MainLayout({ children }) {
    return (
        <div>
            <Navbar></Navbar>

            {children}

            <Footer></Footer>
        </div>
    )
}