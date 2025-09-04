import React from 'react'
import ReactDOM from 'react-dom'
import { useState } from 'react'
import BlogItem from './BlogItem'
function BlogList({blogs}) {
    const [preview , setPreview] = useState(false)
    return (
        <div className="px-6 lg:px-0 col-span-16 lg:col-span-12  min-h-80 gap-4 flex flex-col items-start justify-start divide-y divide-gray-300 pr-6">
            <div className="flex w-full border-none text-xl items-center justify-end gap-4">
                <i className={`fa-solid fa-table-list ${preview? 'text-black' : 'text-blue-700'}`} title="Chỉ tiêu đề" onClick = {() => setPreview(false)}></i>
                <i className={`fa-solid fa-indent ${!preview? 'text-black' : 'text-blue-700'}`} title="Xem trước nội dung" onClick = {() => setPreview(true)}></i>
            </div>
            {
                blogs.map((blog) => <BlogItem blogData = {{...blog}} preview = {preview} />)
            }
            
        </div>
    )
}
export default BlogList