import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function AccountIcon({
    id, //id người dùng
    avatar, //Link dẫn tới avatar người dùng
    name,
    loginState
}) {
    const [show, setShow] = useState(false);
    const handleClick = () => {
        setShow(!show);
    };
    const navigate = useNavigate() 
    const handleLogoutClick = () => {
        localStorage.removeItem('loginToken')  //Đăng xuất 
        loginState(false) //Thoát khỏi chế độ đăng nhập 
        navigate('/')
    }
    return (
        <div
            className="relative rounded-full cursor-pointer w-8 h-8 bg-black bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${avatar})`,
            }}
            onClick={handleClick}>
            {show && (
                <motion.ul
                    className=" absolute top-full mt-2 right-0 z-99999 rounded-xl flex-col shadow-md bg-white flex items-left gap-2 justify-between p-4 w-56 h-62"
                    initial={{ translateY: "-18px" }}
                    animate={{ translateY: 0 }}
                    transition={{ ease: "easeInOut", duration: 0.3 }}>
                    <Link to={`/profile?id=${id}`}>
                        <div className="w-full flex items-center justify-start gap-3">
                            <div
                                className="relative rounded-full w-12 h-12 bg-black bg-cover bg-center bg-no-repeat"
                                style={{
                                    backgroundImage: `url(${avatar})`,
                                }}></div>
                            <div className="text-base text-black font-semibold overflow-hidden max-w-[120px]">
                                {name}
                            </div>
                        </div>
                    </Link>
                    <Link to={`/profile?id=${id}`}>
                        <li className="text-sm  text-gray-700 hover:cursor-pointer hover:text-black">
                            Trang cá nhân
                        </li>
                    </Link>
                    <Link to={`/dashboard?id=${id}`}>
                        <li className="text-sm  text-gray-700 hover:cursor-pointer hover:text-black">
                            Dash Board
                        </li>
                    </Link>
                    <Link to={`/dashboard?id=${id}`}>
                        <li className="text-sm  text-gray-700 hover:cursor-pointer hover:text-black">
                            Viết Blog
                        </li>
                    </Link>
                    <li className="text-sm  text-gray-700 hover:cursor-pointer hover:text-black"
                        onClick = {handleLogoutClick}
                    >
                        Đăng xuất
                    </li>
                    <div></div>
                </motion.ul>
            )}
        </div>
    );
}
export default AccountIcon;
