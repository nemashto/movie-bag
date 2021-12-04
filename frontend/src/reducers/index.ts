import { combineReducers } from "redux"
import { retrieveMovies } from "../actions/movies"

const reducers = combineReducers({
    movies: retrieveMovies,
})

export default reducers
export type RootState = ReturnType<typeof reducers>