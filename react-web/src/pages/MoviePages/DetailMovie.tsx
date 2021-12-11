import React, { useEffect } from "react"
import { useParams } from 'react-router'
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { getMovie, selectMovie } from "../../state/movies/moviesSlicer"

type MovieParams = {
    id: string
}

export const DetailMovie = () => {
    const {id} = useParams<MovieParams>()
    const movie = useAppSelector(selectMovie)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getMovie(id))
    },[dispatch, id])

    return(
        <div className="px-4 py-5 my-5 text-center">
            <img className="d-block mx-auto mb-4" src="" alt="" width="72" height="57" />
            <h1 className="display-5 fw-bold"> {movie.name} </h1>
            <div className="col-lg-6 mx-auto">
                <p className="lead mb-4"><i> {movie.genres.map((genre, index) => (<b key={index}> {genre} / </b>))} </i></p>
                <p className="lead mb-4"> {movie.casts.map((actor, index) => (<i key={index}>{actor}, </i>))} </p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Link to={"/movies/edit/" + id} type="button" className="btn btn-primary btn-lg px-4 gap-3">Edit movie</Link>
                <button type="button" className="btn btn-outline-secondary btn-lg px-4">Delete movie</button>
                </div>
            </div>
      </div>
    )
}