//Một card Blogs
import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { plainText } from "../../Helper/plainText";
function Blog({ userBlog }) {
    return (
        <div
            className="2xl:col-span-4 md:col-span-6 col-span-6 flex flex-col h-128 overflow-hidden 
    bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg">
            {/* Ảnh */}
            <div
                className="bg-gray-400 h-50 shrink-0 w-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${userBlog.banner})`,
                }}></div>

            {/* Nội dung */}
            <div className="w-full py-5 max-h-62">
                <Link to={`/blog?id=${userBlog.blogID}`}>
                    <h3 className="font-semibold text-lg text-blue-900 hover:underline hover:cursor-pointer px-3 text-justify line-clamp-2">
                        {userBlog.title}
                    </h3>
                </Link>

                <div className="w-full text-sm mt-2 leading-[22px] px-3 text-gray-800 font-normal line-clamp-7 h-38">
                    {plainText(userBlog.content)}
                </div>
            </div>

            {/* Button */}
            <div className="w-full flex gap-3 mt-auto shrink-0 mb-10 items-center px-3 py-3 justify-between">
                <Link to={`/blog?id=${userBlog.blogID}`}>
                    <button className="py-2.5 px-2 cursor-pointer text-xs bg-blue-900 font-semibold text-white">
                        READ MORE
                    </button>
                </Link>
                <div className="py-2.5 px-2 cursor-pointer text-xs flex items-center justify-center font-semibold text-gray-300">
                    {Array(5)
                        .fill(0)
                        .map((curr, index) => {
                            return (
                                <i
                                    className={`fa-solid fa-star ${
                                        index < Number(userBlog.score)
                                            ? "text-yellow-400"
                                            : ""
                                    }`}></i>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
export default Blog;
