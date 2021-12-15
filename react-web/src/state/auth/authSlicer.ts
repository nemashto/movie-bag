import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "../../api/auth.service"
import { AxiosError } from 'axios'
import { setMessage } from "../core/messageSlicer"

const user = JSON.parse(localStorage.getItem("user") || '{}')

export const login = createAsyncThunk<any, {email:string} & {password: string}>(
    "auth/login",
    async ({email, password}, thunkAPI) => {
        try {
            const data = await authService.login(email, password)
            return {user: data}
        } catch(err: any) {
            if (err.response.data.message) thunkAPI.dispatch(setMessage(err.response.data.message))
            else thunkAPI.dispatch(setMessage(err))
        }
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        await authService.logout()
    }
)

// slicer
const initialState = (user.accessToken)
    ? {isLoggedIn: true, user}
    : {isLoggedIn: false, user: null}

const authSlicer = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true
                state.user = action.payload.user
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoggedIn = false
                state.user = null
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false
                state.user = null
            })
    }
})

const { reducer } = authSlicer
export default reducer