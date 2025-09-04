import React from "react";
import ReactDOM from "react-dom";
import { plainText } from "../../Helper/plainText";
import { Link } from "react-router-dom";
function SearchResultsItem({ blogData }) {
    //preview: Có xem trước nội dung bài viết hay không
    //Toc do doc trung binh cua nguoi viet la 250WPM
    const {blogID , title , name , avatar , createdAt , score , updatedAt , views , watches , userID} = blogData
    
    let Views =
        views > 1000 ? (views / 1000).toFixed(1) + "K" : views.toString();
    return (
        <div className="flex gap-3 pb-4 items-start justify-between w-full min-h-20">
            <div
                className="rounded-full w-10 h-10 md:w-12 md:h-12 bg-black bg-center bg-cover bg-no-repeat" //Avatar
                style={{
                    backgroundImage: `url(${avatar})`,
                }}></div>
            {/* Thong tin tong quan ve bai viet: Tac gia - Thoi gian update - Thoi gian doc  */}
            <div className="flex flex-col gap-1 flex-1 min-h-20">
                <div className="flex items-center text-xs md:text-sm text-gray-600 justify-start gap-4">
                <Link to = {`/profile?id=${userID}`}>
                    <span className="hover:cursor-pointer hover:underline text-blue-700">
                        {name}
                    </span>

                </Link>
                    <span title={`${new Date(createdAt).toLocaleDateString("vi-VN")}`}>
                        {new Date(createdAt).toLocaleDateString("vi-VN")}
                    </span>
                </div>
                {/* Tieu de bai viet */}
                <Link to = {`/blog/?id=${blogID}`}>
                    <h3 className="md:text-lg font-medium inline text-blue-800 text-base hover:cursor-pointer hover:underline hover:text-blue-700 line-clamp-1">
                        {title}
                    </h3>
                </Link>
                {/* So luot xem - So sao danh gia */}
                <div className="flex gap-5 md:text-sm text-xs text-gray-600">
                    <span className="block" title="Lượt xem">
                        <i class="fa-solid fa-eye"></i> {Views}
                    </span>
                    <span className="block" title="Đánh giá">
                        <i class="fa-solid fa-star"></i> {Math.floor(score)}
                    </span>
                </div>
            </div>
        </div>
    );
}
export default SearchResultsItem;
