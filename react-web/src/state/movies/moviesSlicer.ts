import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import MovieDataService from "../../api/movieService"
import { RootState } from "../store"
import IMovieData from "../../common/types/Movie"

export interface MovieState {
    movies: IMovieData[],
    status: 'idle' | 'loading' | 'failed'
}

const initialState: MovieState = {
    movies: [],
    status: 'idle'
}

export const getMovies = createAsyncThunk(
    "movies/get",
    async() => {
        const response = await MovieDataService.getAll()
        return response.data
    }
)

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMovies.fulfilled, (state, action: PayloadAction<IMovieData[]>) => {
                state.status = 'idle'
                state.movies = action.payload       
            })
    }
})

export const selectMovie = (state: RootState) => state.movies

export default movieSlice.reducer