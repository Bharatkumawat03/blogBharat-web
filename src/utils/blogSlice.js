import { createSlice } from "@reduxjs/toolkit";


const blogSlice = createSlice({
    name: "blog",
    initialState: null,
    reducers: {
        addBlog: (state, action) => action.payload,
        removeBlog: (state, action) => {
            const newBlogs = state.filter(blog => blog._id !== action.payload);
            return newBlogs
        },
        updateBlog: (state, action) => {
            return state.map((b) => (b._id === action.payload._id ? action.payload : b));
        },
    }
});

export const {addBlog, removeBlog, updateBlog, setTotalPages} = blogSlice.actions;
export default blogSlice.reducer;