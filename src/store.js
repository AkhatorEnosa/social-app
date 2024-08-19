import { configureStore } from "@reduxjs/toolkit";
import apiReducer from '../src/components/api/apiSlice'

export const store = configureStore({
    reducer: {
        user: apiReducer
    }
})