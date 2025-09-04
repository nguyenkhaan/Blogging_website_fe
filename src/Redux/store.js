import { configureStore } from "@reduxjs/toolkit";
import personalSlice from "./slices/personalSlice";
import blogSlice from "./slices/blogSlice";

const store = configureStore({
    reducer: {
        personalInfo: personalSlice.reducer, 
        blogInfo: blogSlice.reducer 
    }
})
export default store 