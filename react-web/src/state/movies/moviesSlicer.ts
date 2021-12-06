import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import MovieDataService from "../../api/movieService"
import { RootState } from "../store"
import {IMovieData, IMovieInputData} from "../../common/types/Movie"

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

export const createMovie = createAsyncThunk(
    "movies/create",
    async ( data: IMovieInputData) => { 
      const res = await MovieDataService.create(data);
      return res.data;
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
            .addCase(createMovie.fulfilled, (state, action) => {

            })
    }
})

export const selectMovie = (state: RootState) => state.movies

export default movieSlice.reducer