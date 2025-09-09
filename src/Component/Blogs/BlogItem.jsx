import React from "react";
import ReactDOM from "react-dom";
import { plainText } from "../../Helper/plainText";
import { Link } from "react-router-dom";
function BlogItem({ blogData, preview }) {
    //preview: Có xem trước nội dung bài viết hay không
    //Toc do doc trung binh cua nguoi viet la 250WPM
    let { blogID, title, author, createdAt, score, views, content = '' } = blogData;
    let readingTime = Math.floor(content.replace(/[\s]/g, "").length / 250);  //Truyen tai them thoi gian doc tu server 
    let Views =
        views > 1000 ? (views / 1000).toFixed(1) + "K" : views.toString();
    return (
        <div className="flex gap-3 pb-4 items-start justify-between w-full min-h-20">
            <div
                className="rounded-full w-8 h-8 md:w-12 md:h-12 bg-black bg-center bg-cover bg-no-repeat" //Avatar
                style={{
                    backgroundImage: `url(${author.avatar})`,
                }}></div>
            {/* Thong tin tong quan ve bai viet: Tac gia - Thoi gian update - Thoi gian doc  */}
            <div className="flex flex-col gap-1 flex-1 min-h-20">
                <div className="flex items-center text-xs md:text-sm text-gray-600 justify-start gap-4">
                <Link to = {`/profile?id=${author.userID}`}>
                    <span className="hover:cursor-pointer hover:underline text-blue-700">
                        {author.name}
                    </span>

                </Link>
                    <span title={`${new Date(createdAt).toLocaleDateString("vi-VN")}`}>
                        {new Date(createdAt).toLocaleDateString("vi-VN")}
                    </span>
                    <span className="block mx-2">-</span>
                    <span title="20 phút đọc">{readingTime} phút đọc</span>
                </div>
                {/* Tieu de bai viet */}
                <Link to = {`/blog/?id=${blogID}`}>
                    <h3 className="md:text-lg font-medium inline text-blue-800 text-base hover:cursor-pointer hover:underline hover:text-blue-700 line-clamp-1">
                        {title}
                    </h3>
                </Link>
                {preview && (
                    <p className="text-base text-gray-800 my-2 line-clamp-3">
                        {plainText(content)}
                    </p>
                )}
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
export default BlogItem;
