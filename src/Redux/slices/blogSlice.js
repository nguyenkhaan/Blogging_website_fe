import { createSlice } from "@reduxjs/toolkit"; 

const blogSlice = createSlice({
    name: 'blogs', 
    initialState: [], //banner , titile , content , blogID , du lieu o dang {} 
    reducers: {
        addblog: (state , action) => {
            state.push(action.payload)
        }, 
        updateblog: (state , action) => {
            state = action.payload //Update blog 
        }, 
        deleteblog: (state , action) => {
            const blogID = action.payload 
            const remainBlogs = state.filter(blog => blog.blogID !== blogID) 
            state = remainBlogs   //tra ve nhung blog con lai 
        }   
    }
})

export default blogSlice