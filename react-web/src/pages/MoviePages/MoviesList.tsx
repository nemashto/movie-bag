import React, {useEffect} from "react";
import { Movie } from "../../common/components/movie";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { getMovies, selectMovie } from "../../state/movies/moviesSlicer";


export const MovieList = () => {
    const movies = useAppSelector(selectMovie)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getMovies())
    },[dispatch])

    return (
        <main className="container">
            <div className="p-4 p-md-5 mb-4 text-dark rounded bg-white">
                <div className="col-md-6 px-0">
                    <h1 className="display-4 fst-italic">My Movies</h1>
                </div>
            </div>

            <div className="album py-5 bg-white">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-3">
                    {movies.movies &&
                        movies.movies.map((movie, index) => (
                            <Movie key={index} {...movie} />
                        ))
                    }
                    </div>
                </div>
            </div>
        </main>
    )
}