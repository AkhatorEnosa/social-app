import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
    isLoading: false,
    posts: [],
    likes: [],
    error: false
}

export const fetchPosts  = createAsyncThunk("post/post", async() => {
        try {
            const res = await axios.get('http://localhost:1997/posts')
            return res.data
        } catch (err) {
            return err
        }
})

export const addPost = createAsyncThunk("post/addPost", async(postData, thunkAPI) => {
    try {
        const res = await axios.post("http://localhost:1997/posts", postData)
        return res.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.res.data.errors)
    }
})

export const deletePost = createAsyncThunk("post/deletePost", async(id) => {
    await axios.delete(`http://localhost:1997/posts/${id}`)
    return id
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
            .addCase(addPost.pending, (state) => {
                state.isLoading = true,
                state.posts = null
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.isLoading = false,
                state.posts = [...state.posts, action.payload]
            })
            .addCase(addPost.rejected, (state) => {
                state.isLoading = false,
                state.posts = null,
                state.error = true
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                const updatedPosts = state.posts.filter(post => post.id !== action.payload)
                state.isLoading = false,
                state.posts = updatedPosts
                state.error = false
            })
            .addCase(deletePost.rejected, (state) => {
                state.isLoading = false,
                state.posts = null,
                state.error = true
            })
    }
})

export default PostSlice.reducer