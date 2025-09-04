import React from 'react'
import ReactDOM from 'react-dom'
import Blog from './Blogs'
function TopBlog({ blogs }) {
    return (
        <div className="min-h-140 py-12 md:p-12 px-4 md:px-10 lg:px-12">
            <div className="md:grid md:grid-cols-3 flex flex-col items-center justify-center gap-y-8">
                {blogs.map((blog, index) => {
                    return <Blog blogTitle={blog.title} middle={(index == 1)} subblog={blog.subblog} />
                })}

            </div>
        </div>
    )
}
export default TopBlog

/**
 * blogs: {
 *  name: 
 *  short description: 
 *  related: [
 *  {} , {} , {}...   (Đệ quy)
 * ]
 * }
<Blog /> 
<Blog middle = {true} /> 
<Blog /> 
 */