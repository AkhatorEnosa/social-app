import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
    isLoading: false,
    posts: null,
    error: false
}

export const fetchPosts  = createAsyncThunk("user/post", async() => {
        try {
            const res = await axios.get('http://localhost:1997/posts')
            // console.log(res.data)
            return res.data
        } catch (err) {
            return err
        }
})

const PostSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.isLoading = true,
                state.posts = null
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.isLoading = false,
                state.posts = action.payload
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.isLoading = false,
                state.posts = null,
                state.error = true
            })
    }
})

export default PostSlice.reducer