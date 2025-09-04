import React from 'react'
import ReactDOM from 'react-dom'
import { Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { publicRoutes as router } from '../Routes/routes'
import Navbar from '../Component/Navbar'
import Footer from '../Component/Footer'
function Layout({ children }) {
    return (
        <>
            <Navbar></Navbar>

            {children}

            <Footer></Footer>
        </>
    )
}
export default Layout