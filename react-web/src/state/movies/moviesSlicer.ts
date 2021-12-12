import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import MovieDataService from "../../api/movieService"
import { RootState } from "../store"
import {IMovieData, IMovieInputData} from "../../common/types/Movie"


export interface MoviesState {
    movies: IMovieData[]
    movie: IMovieData
    error: string | undefined
}

const initialState: MoviesState = {
    movies: [],
    movie: {
        _id: {},
        name: '',
        casts: [],
        genres: [],
    },
    error: '',
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

  export const deleteMovie = createAsyncThunk(
    "movies/delete",
    async(id: string) => {
        const response = await MovieDataService.remove(id)
        return response.data
    }
)

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMovies.fulfilled, (state, action: PayloadAction<IMovieData[]>) => {
                state.movies = action.payload
                state.error = ''          
            })
            .addCase(getMovies.rejected, (state, action) => {
                state.error = action.error.message
            })

            .addCase(createMovie.fulfilled, (state, action) => {
                state.error = ''
            })
            .addCase(createMovie.rejected, (state, action) => {
                state.error = action.error.message
            })

            .addCase(getMovie.fulfilled, (state, action: PayloadAction<IMovieData>) => {
                state.movie = action.payload 
                state.error = ''       
            })
            .addCase(editMovie.fulfilled, (state, action: PayloadAction<IMovieData>) => {
                state.error = ''
            })
            .addCase(deleteMovie.fulfilled, (state, action) => {
                state.error = ''
            })
    }
})

export const selectMovies = (state: RootState) => state.movies.movies
export const selectMovie = (state: RootState) => state.movies.movie
export const selectError= (state: RootState) => state.movies.error

export default moviesSlice.reducer