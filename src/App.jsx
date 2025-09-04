import React from 'react'
import ReactDOM from 'react-dom'
import Scroll from './Component/Scroll'
import { Routes, Route } from 'react-router-dom'
import { publicRoutes } from './Routes/routes.jsx'
import Profile from './Pages/Profile.jsx'
import Toast from './Component/Toast.jsx'
import { callingToast } from './Service/callingToast.js'
import UserDashboard from './Pages/UserDashboard.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
function App() {
    return (
        <div className="w-full h-full relative">
            {/* {Muốn sử dụng Toast Mesage ở đâu thì gọi hàm callingToast, tham số truyền vào gồm có loại và message thông báo} */}
            <Toast /> 
            <div className='w-full relative'>
                <Scroll />
                <Routes>
                    {publicRoutes.map(({ path, role, element }, index) => {
                        return <Route key={index} path={path} element={element}></Route>
                    })}
                </Routes>
            </div>

        </div>
    )
}
export default App