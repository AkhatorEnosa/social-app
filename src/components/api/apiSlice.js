import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
        loading: false,
        user: [],
        error: null
    }

export const register  = createAsyncThunk("user/register", async(userData, thunkAPI) => {
    if(userData.name === "" || userData.u_name === "" || userData.gender === "" || userData.email === "" || userData.password === "") {
        userData = initialState
    } else {
        try {
            const res = await axios.post('http://localhost:1997/users', userData)
            // console.log(res.data)
            return res.data
        } catch (err) {
            console.log('errro')
            return thunkAPI.rejectWithValue(err.res.data.errors)
        }
    }
})  

export const login  = createAsyncThunk("user/login", async(userData, thunkAPI) => {
    if(userData.email === "" || userData.password === "") {
        userData = initialState
    } else {
        try {
            const res = await axios.get('http://localhost:1997/users')
            const findUser = res.data.find(user => user.email == userData.email && user.password == userData.password) //not a secure way to handle logging in

            if(findUser) {
                return findUser
            } else {
                console.log("No such user")
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.res.data.errors)
        }
    }
})

export const getCurrUser  = () => {
     const userData = localStorage.getItem('user') ?? '' 
     if(userData) {
        return JSON.parse(userData)
     }
}

export const logout = createAsyncThunk("user/logout",  async() => {
    localStorage.removeItem('user')
})

const apiSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(register.pending, state => {
                state.loading = true
            })
            .addCase(register.fulfilled, (state,action) => {
                state.loading = false,
                state.user = [...state.user, action.payload]
            })
            .addCase(register.rejected, (state) => {
                state.loading = false,
                state.user = null,
                state.error = true
            })
            .addCase(login.pending, state => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state,action) => {
                    state.loading = false,
                    state.user = action.payload
            })
            .addCase(login.rejected, (state) => {
                state.loading = false
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false,
                state.user = []
            })
    }
})

export default apiSlice.reducer