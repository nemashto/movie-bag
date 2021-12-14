import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "../../api/auth.service"
import { AxiosError } from 'axios'
import { setMessage } from "../core/messageSlicer"

const user = JSON.parse(localStorage.getItem("user") || '{}')

interface ValidationErrors {
    errorMessage: string

  }

export const login = createAsyncThunk<any, {email:string} & {password: string}>(
    "auth/login",
    async ({email, password}, thunkAPI) => {
        try {
            const data = await authService.login(email, password)
            return {user: data}
        } catch(error) {
            let message
            if (error instanceof Error) message = error.message
            else message = String(error)

            if (message.endsWith('401') || message.endsWith('500')) message = 'Email or password invalid'
            thunkAPI.dispatch(setMessage(message))
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
                console.log(action.payload)
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false
                state.user = null
            })
    }
})

const { reducer } = authSlicer
export default reducer