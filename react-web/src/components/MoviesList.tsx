import React, {useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getMovies, selectMovie } from "../app/slices/moviesSlicer";


export const MovieList = () => {
    const movies = useAppSelector(selectMovie)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getMovies())
    },[dispatch])

    return (
        <div>
            <h2>My Movies</h2>
            <ul>
                {movies.movies &&
                    movies.movies.map((movie, index) => (
                        <li key={index}>
                            {movie.name}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}