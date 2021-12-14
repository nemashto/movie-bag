import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import MovieDataService from "../../api/movieService"
import { RootState } from "../store"
import {IMovieData, IMovieInputData} from "../../common/types/Movie"
import { setMessage } from "../core/messageSlicer"


export interface MoviesState {
    movies: IMovieData[]
    filteredMovies: IMovieData[] | undefined
    movie: IMovieData
    error: string | undefined
}

interface ErrorState {
    message: string
}

const initialState: MoviesState = {
    movies: [],
    filteredMovies: undefined,
    movie: {
        _id: {},
        name: '',
        casts: [],
        genres: [],
    },
    error: '',
} 

const asc = (a: IMovieData, b: IMovieData) => {
    const fa = a.name.toLowerCase()
    const fb = b.name.toLowerCase()
    
    if (fa < fb) return 1
    if (fa > fb) return -1
    return 0
}

const desc = (a: IMovieData, b: IMovieData) => {
    const fa = a.name.toLowerCase()
    const fb = b.name.toLowerCase()
    
    if (fa < fb) return -1
    if (fa > fb) return 1
    return 0
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
    async ( data: IMovieInputData, thunkAPI) => { 
        try {
            const res = await MovieDataService.create(data);
            return res.data;
        } catch(err: any) {
            thunkAPI.dispatch(setMessage(err.response.data.message))
        }
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
    reducers: {
        movieFilter: (state, action) => {
            let filteredMovie = state.movies.filter(movie => movie.name.toLocaleLowerCase().includes(action.payload))
            if (action.payload) {
                state.filteredMovies = filteredMovie
            } else {
                state.filteredMovies = state.movies
            }     
        },
        movieOrder: (state, action) => {
            let orderedMovie: IMovieData[] = []
            if (state.filteredMovies) {
                orderedMovie = state.filteredMovies
                if (action.payload === 'asc') {
                    orderedMovie = orderedMovie.sort((a,b) => asc(a,b))
                } else if (action.payload === 'desc') {
                    orderedMovie = orderedMovie.sort((a,b) => desc(a,b))
                }
                state.filteredMovies = orderedMovie
            } else {
                orderedMovie = state.movies
                if (action.payload === 'asc') {
                    orderedMovie = orderedMovie.sort((a,b) => asc(a,b))
                } else if (action.payload === 'desc') {
                    orderedMovie = orderedMovie.sort((a,b) => desc(a,b))
                }
                state.movies = orderedMovie
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMovies.fulfilled, (state, action: PayloadAction<IMovieData[]>) => {
                state.movies = action.payload
                state.error = ''          
            })
            .addCase(getMovies.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload
            })

            .addCase(createMovie.fulfilled, (state, action) => {
                state.error = ''
            })
            .addCase(createMovie.rejected, (state, action: PayloadAction<any>) => {
                console.log(action.payload)
                state.error = action.payload
            })

            .addCase(getMovie.fulfilled, (state, action: PayloadAction<IMovieData>) => {
                state.movie = action.payload 
                state.error = ''       
            })
            .addCase(editMovie.fulfilled, (state, action: PayloadAction<IMovieData>) => {
                state.error = ''
            })
            .addCase(editMovie.rejected, (state, action) => {
                state.error = action.error.message
            })

            .addCase(deleteMovie.fulfilled, (state, action) => {
                state.error = ''
            })
            .addCase(deleteMovie.rejected, (state, action) => {
                state.error = action.error.message
            })
    }
})

export const selectMovies = (state: RootState) => state.movies.movies
export const selectFilteredMovies = (state: RootState) => state.movies.filteredMovies
export const selectMovie = (state: RootState) => state.movies.movie
export const selectError= (state: RootState) => state.movies.error

export const { movieFilter, movieOrder } = moviesSlice.actions

export default moviesSlice.reducer
