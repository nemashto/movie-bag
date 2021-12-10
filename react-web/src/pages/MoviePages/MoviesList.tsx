import React, {useEffect} from "react";
import { Movie } from "../../common/components/movie";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { getMovies, selectMovies } from "../../state/movies/moviesSlicer";


export const MovieList = () => {
    const movies = useAppSelector(selectMovies)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getMovies())
    },[dispatch])

    return (
        <div>
            <div className="p-4 p-md-3 mb-4 text-dark rounded bg-white">
                <div className="col-md-3 px-0">
                    <h1 className="display-4 fst-italic">My Movies</h1>
                </div>
            </div>

            <div className="album py-5 bg-white">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-3">
                    {movies &&
                        movies.map((movie, index) => (
                            <div key={index} className="col-md-6">
                                <Movie  {...movie} />
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}