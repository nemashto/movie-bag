import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "../../api/auth.service"
import { RootState } from "../store"

const user = JSON.parse(localStorage.getItem("user") || '{}')

export const login = createAsyncThunk<any, {email:string} & {password: string}>(
    "auth/login",
    async ({email, password}, thunkAPI) => {
        try {
            const data = await authService.login(email, password)
            return {user: data}
        } catch(error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
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
const initialState = (user.length > 0)
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
            .addCase(login.rejected, (state) => {
                state.isLoggedIn = false
                state.user = null
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false
                state.user = null
            })
    }
})

export const selectAuth = (state: RootState) => state.auth

const { reducer } = authSlicer
export default reducer