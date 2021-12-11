import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import MovieDataService from "../../api/movieService"
import { RootState } from "../store"
import {IMovieData, IMovieInputData} from "../../common/types/Movie"


export interface MoviesState {
    movies: IMovieData[]
    movie: IMovieData
    status: 'idle' | 'loading' | 'failed'
    error: string | undefined | null
}

const initialState: MoviesState = {
    movies: [],
    movie: {
        _id: {},
        name: '',
        casts: [],
        genres: [],
    },
    status: 'idle',
    error: null,
}

export const getMovies = createAsyncThunk(
    "movies/get",
    async() => {
        const response = await MovieDataService.getAll()
        return response.data
    }
)

export const getMovie = createAsyncThunk(
    "movies/get/id",
    async(id: string) => {
        const response = await MovieDataService.get(id)
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

export const editMovie = createAsyncThunk(
    "movies/edit",
    async (movie: IMovieData) => { 
        const id: string = String(Array(Object.values(movie._id))[0])
        let data: IMovieInputData = {
            name: movie.name,
            genres: movie.genres,
            casts: movie.casts,
        } 
        const res = await MovieDataService.update(id, data);
        return res.data;
    }
  )

const moviesSlice = createSlice({
    name: 'movies',
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
            .addCase(getMovie.fulfilled, (state, action: PayloadAction<IMovieData>) => {
                state.status = 'idle'
                state.movie = action.payload       
            })
            .addCase(editMovie.fulfilled, (state, action: PayloadAction<IMovieData>) => {

            })
    }
})

export const selectMovies = (state: RootState) => state.movies.movies
export const selectMovie = (state: RootState) => state.movies.movie

export default moviesSlice.reducer