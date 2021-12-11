import React, {useEffect} from "react"
import { useParams } from 'react-router'
import { EditMovieForm } from "../../common/components/editMovieForm"
import { useAppDispatch, useAppSelector } from "../../state/hooks"
import { getMovie, selectMovie } from "../../state/movies/moviesSlicer"

type MovieParams = {
    id: string
}

export const EditMovie = () => {
    const {id} = useParams<MovieParams>()
    const movie = useAppSelector(selectMovie)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getMovie(id))
    },[dispatch, id])
    

    return(
        <div className="row col-8 bg-white d-flex justify-content-center">
            <div className="py-3 text-center">
                <div className="">
                    <h2>Edit Movie</h2>
                    <p className="lead">Please fill your movie to this form.</p>
                </div>
            </div>
            <EditMovieForm {...movie} />
        </div>
    )
}