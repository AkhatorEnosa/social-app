import { configureStore } from "@reduxjs/toolkit";
import apiReducer from '../src/components/api/apiSlice'
import postReducer from '../src/components/api/PostSlice'

export const store = configureStore({
    reducer: {
        user: apiReducer,
        post: postReducer
    }
})