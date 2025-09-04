import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
function Personal({ personalInformation }) {
    const totalBlog = Array.isArray(personalInformation.blogs)
        ? personalInformation.blogs.length
        : 0;
    return (
        <div className="2xl:col-span-4 col-span-16 w-screen 2xl:w-full min-h-80 flex flex-col 2xl:block justify-center px-8 py-10 items-center">
            <div className="w-full flex justify-center items-center">
                <div
                    className="flex rounded-full justify-center items-center w-56 h-56 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${personalInformation.avatar})`,
                    }}>
                    <div className="block opacity-0 cursor-pointer rounded-full w-60 h-60"></div>
                </div>
            </div>
            <div className="w-full mt-6">
                <h2 className="text-2xl font-semibold break-all">
                    {personalInformation.name}
                </h2>
                <span className="font-sans mt-1 mb-2 block text-lg text-gray-700 break-all ">
                    {personalInformation.email}
                </span>
                <div className="w-full flex text-black flex-col justify-start mb-2 gap-2">
                    <span className="text-sm">
                        <span className="font-semibold">
                            <i class="fa-solid fa-user"></i>{" "}
                            {personalInformation.follows}
                        </span>{" "}
                        người theo dõi
                    </span>
                    <span className="text-sm">
                        <span className="font-semibold">
                            <i class="fa-solid fa-eye"></i>{" "}
                            {personalInformation.subscribers}
                        </span>{" "}
                        đang theo dõi
                    </span>
                </div>
                <span className="text-sm">
                    <span className="font-semibold">
                        <i class="fa-solid fa-pen"></i> {totalBlog}
                    </span>{" "}
                    bài viết
                </span>
            </div>
        </div>
    );
}
export default Personal;
