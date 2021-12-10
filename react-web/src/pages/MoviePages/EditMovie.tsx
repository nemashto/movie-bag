import React, {useEffect} from "react"
import { AddMovieForm } from "../../common/components/addMovieForm"
import { IMovieData } from "../../common/types/Movie"
import { useAppDispatch, useAppSelector } from "../../state/hooks"
import { createMovie, getMovies, selectMovie } from "../../state/movies/moviesSlicer"

export const EditMovie = (id: string) => {
    const movies = useAppSelector(selectMovie)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getMovies())
    },[dispatch])

    const initialValues: IMovieData = {
        _id: {},
        name: '',
        genres: [],
        casts: [],
    }
    
    const saveMovie = (values: IMovieData) => {
        dispatch( createMovie(values))
    }

    return(
        <div className="row col-8 bg-white d-flex justify-content-center">
            <div className="py-3 text-center">
                <div className="">
                    <h2>Add Movie</h2>
                    <p className="lead">Please fill your movie to this form.</p>
                </div>
            </div>
            <AddMovieForm {...initialValues} {...saveMovie} />
        </div>
    )
}