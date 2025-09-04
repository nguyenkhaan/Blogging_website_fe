import React from 'react'
import ReactDOM from 'react-dom'
function RelatedBlog({
    title = 'My blog Everyday'
})   //Cac blog con lien quan nam o phia ben duoi blog chinh 
{
    return (
        <li className = "flex items-center justify-between  py-2 gap-3 w-full">
            <div className = "lg:h-20 h-14 w-14 lg:w-20 bg-gray-600 flex-shrink-0"></div>
            <span className = "text-md font-sans block w-full text-left">{title}</span>
        </li>
    )
}
const middleLineProps = () => {  //Đường line phân cách ở giữa, sử dụng padding và border lại cho padding 
    return (
        "px-3 border-solid border-x-1 border-gray-300"
    )
}
function Blog({
    blogTitle = 'My Blog Everyday', //Dữ liệu nhận vào gồm có title của bài viết
    middle = false,   //Biến middle xem cơ phải là phần tử ở giũa không để thêm middleLine 
    subblog = ['My blog Everyday' , 'My blog Everyday']
}) {
    return (
        <div className={`${(middle || window.innerWidth <= 768) ? middleLineProps() : 'px-3'} w-full`}>
            <h2 className="font-light pb-4 mb-1 border-solid border-b-2 border-b-gray-800 text-2xl">Top Ranking Blogs</h2>
            <div className="bg-gray-400 h-70 md:h-50 lg:h-70 w-full block"></div>
            <div className="blog__name block text-center font-sans py-3 font-light text-xl md:text-2xl">
                {blogTitle}
            </div>
            <ul className = "min-h-40 md:divide-y divide-gray-300">
                {subblog.map((sub) => {
                    return <RelatedBlog title = {sub}/> 
                })} 
            </ul>
        </div>
    )
}
export default Blog
//sub chính là title của các subblog 