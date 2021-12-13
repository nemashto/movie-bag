import { createSlice } from "@reduxjs/toolkit"
import { string } from "yup/lib/locale"
import { RootState } from "../store"

interface msg {
    message: string
}

const initialState: msg = {
    message: ''
}

const messageSlice= createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload
        },
        clearedMessage: (state) => {
            state.message = ''
        }
    }
})

export const {setMessage, clearedMessage} = messageSlice.actions
export const selectMessage = (state: RootState) => state.message

const {reducer} = messageSlice
export default reducer
