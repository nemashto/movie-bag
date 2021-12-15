import React, {useEffect} from "react";
import { Movie } from "../../common/components/movie";
import { IMovieData } from "../../common/types/Movie";
import { clearedMessage, selectMessage } from "../../state/core/messageSlicer";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { getMovies, movieOrder, selectFilteredMovies, selectMovies } from "../../state/movies/moviesSlicer";


export const MovieList = () => {
    const moviesStore = useAppSelector(selectMovies)
    const filteredStore = useAppSelector(selectFilteredMovies)
    const {message} = useAppSelector(selectMessage)
    const dispatch = useAppDispatch()
    var movies : IMovieData[] = []

    useEffect(() => {
        dispatch(clearedMessage())
        dispatch(getMovies())
    },[dispatch])

      // movie list order
      const sortByOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        const direction = value.endsWith('asc') ? 'asc' : 'desc'

        dispatch(movieOrder(direction))
      }

      if (filteredStore) {
          movies = filteredStore
      } else {
          movies = moviesStore
      }
      
    return (
        <div>
            {message && <div className="alert alert-danger" role="alert">
                    {message}
                </div>
            }
            <div className="p-4 p-md-3 mb-4 text-dark rounded bg-white">
                <div className="col-md-3 px-0">
                    <h1 className="display-4 fst-italic">My Movies</h1>
                </div>
            </div>

            <div className="album py-5 bg-white">
                <div className="container">
                    <div className="mb-3">
                        <select className="custom-select" onChange={(e) => sortByOrder(e)}>
                            <option value="" disabled selected>Sort by</option>
                            <option value='alphabet_desc'>name A-Z</option>
                            <option value='alphabet_asc'>name Z-A</option>
                        </select>
                    </div>
                </div>
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