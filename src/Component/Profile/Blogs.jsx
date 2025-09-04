//Một card Blogs
import React from "react";
import ReactDOM from "react-dom";
import Blog from "./Blog";
function Blogs({ userBlogs }) {
    return (
        // Thẻ bọc bên ngoài toàn bộ phần Blog. Phần bên trong sẽ là thẻ chứa các blogs
        <div>
            <>
                <h2 className="text-2xl font-semibold block  w-full text-left font-sans mb-6 2xl:mb-8">
                    Danh sách bài viết
                </h2>
                {userBlogs == [] ? (
                    <div className="text-center w-full italic text-xl">
                        Không có bài viết nào
                    </div>
                ) : (
                    <div className="w-full grid md:grid-cols-12 grid-cols-6 gap-4 2xl:gap-6">
                        {userBlogs.map((userBlog) => (
                            <Blog userBlog={userBlog} />
                        ))}
                    </div>
                )}
            </>
        </div>
    );
}
export default Blogs;
