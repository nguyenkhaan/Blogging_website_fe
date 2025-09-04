import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import BlogList from '../Component/Blogs/BlogList'
import RankingList from '../Component/Blogs/RankingList'
import api from '../Aixos/api'
import { getBlogByPage } from '../Service/getBlogByPage'
const sampleBlogData = {
    title: 'Đệ Quy (Recursion) trong Java | Giải thích và Ứng dụng',
    author: 'Nguyen Kha An',
    date: new Date('2006-10-18'),
    views: 48000,
    stars: 5,
    content: `Trong bài viết trước chúng ta đã tìm hiểu về: SOLID trong lập trình hướng đối tượng OOP.
                Trong bài viết này chúng ta sẽ tìm hiểu chi tiết hơn về: DIP(Dependency Inversion Priciple) nguyên tắc thứ 5 trong SOLID.Bên cạnh đó là cách áp dụng thực tế DIP thông qua kỹ thuật IoC(Inversion of Control) trong C#.IoC là gì?
                IoC là viết tắt của Inversion of Control là nguyên lý về đảo ngược`
}
const sampleAuthorData = {
    name: 'Nguyen Kha An', 
    email: 'nguyenkhaan2006@gmail.com', 
    famous: 5, 
    blogs: 4800, 
    subscribers: 7800, 
    follows: 5600 
}
const blogs = [] //Danh sach cai bai blog 
for (let i = 0; i < 100; ++i) {
    blogs.push({
        ...sampleBlogData,
        id: i + 1
    })
}
const author = [] 
for (let i = 0; i < 4; ++i) {
    author.push({
        ...sampleAuthorData, 
        id: i + 1 
    })
}
const totalPage = Math.ceil(blogs.length / 20)
function Blogs() {

    const [page, setPage] = useState(0)
    const [dataShow, setDataShow] = useState([])
    const [totalPage , setTotalPage] = useState(0) 

    // [PAGE CHANGE] 
    const handlePageClick = ({ selected }) => {
        console.log(selected)
        setPage(selected)  //SET PAGE CHANGE 
    }
    // [DATA SHOW]
    useEffect(() => {
        const blogs = getBlogByPage(page).then(data => {
            setDataShow(data.data.blogs)
        })
        // setDataShow(blogs.slice(page * 20, page * 20 + 20))  //CALL API TO GET DAATA SHOW APPRORIATE WITH PAGE 
    }, [page])

    // [GET TOTAL PAGES]
    useEffect(() => {
        const getTotalPage = async () => {
            const ans = await api.get('/count-blog' , {
                headers: {
                    "Content-Type" : "application/json", 
                }, 
                withCredentials: 'include'
            })
            return ans 
        }
        getTotalPage().then(data => setTotalPage(Math.ceil(data.data / 20))) 
    } , [])
    
    return (
        <>
            <div className="w-full min-h-80  grid grid-cols-16 pt-4 gap-3">

                <BlogList blogs={dataShow} />
                <RankingList authors = {author} />

            </div>
            <div className="w-full col-span-16 flex justify-center items-center my-6">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next"
                    pageRangeDisplayed={3}   //display bao nheiu trang thi xuat hien dau cham 
                    marginPagesDisplayed={2}
                    onPageChange={handlePageClick}
                    pageCount={totalPage}
                    previousLabel="Previous"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination flex items-center text-blue-600 text-xl justify-center gap-1"
                    previousLinkClassName="2xl:p-4 p-2 border border-gray-300 cursor-pointer justify-center flex items-center flex-shrink-0 min-w-6 h-7 rounded hover:bg-gray-200 transition"
                    nextLinkClassName='2xl:p-4 p-2 border border-gray-300 cursor-pointer justify-center flex items-center flex-shrink-0 min-w-6 h-7 rounded hover:bg-gray-200 transition'
                    // nextClassName='p-4 p-2 border border-gray-300 cursor-pointer justify-center flex items-center flex-shrink-0 min-w-6 h-7 rounded hover:bg-gray-200 transition'
                    activeClassName="rounded font-semibold text-white bg-blue-600"
                    pageLinkClassName="2xl:p-4 p-2 border border-gray-300 cursor-pointer justify-center flex items-center flex-shrink-0 min-w-6 h-7 rounded hover:bg-gray-200 transition"
                />
            </div>
        </>
    )
}
export default Blogs 