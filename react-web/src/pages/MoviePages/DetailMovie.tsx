import React, { useEffect, useState } from "react"
import { useParams } from 'react-router'
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { deleteMovie, getMovie, selectError, selectMovie } from "../../state/movies/moviesSlicer"

type MovieParams = {
    id: string
}

export const DetailMovie = () => {
    const {id} = useParams<MovieParams>()
    const movie = useAppSelector(selectMovie)
    const error = useAppSelector( selectError )
    const dispatch = useAppDispatch()
    const [toDelete, setToDelete] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        dispatch(getMovie(id))
    },[dispatch, id])

    const removeMovie = ()  => {
        setLoading(true)

        dispatch(deleteMovie(id))
            .unwrap()
            .then(() => {
                console.log("yes")
                setDeleted(true)
            })
            .catch(() => {
                console.log("no")
                setDeleted(false)
                setToDelete(false)
                setLoading(false)
            })
    }

    return(
        <div className="px-4 py-5 my-5 text-center">
            {deleted ? (
                <div className="alert alert-success" role="alert">
                    <h4>The movie is already deleted</h4>
                    <Link to={"/"} className="btn btn-primary" type="button">Ok</Link>
                </div>
            ) : (
                <div>
                    {toDelete ? (
                        <div className="alert alert-secondary" role="alert">
                            <h4>Do you really want delete this movie?</h4>
                            <button className="btn btn-danger" type="button" onClick={removeMovie}>Yes</button>
                            <button className="btn btn-secondary" type="button" onClick={()=>setToDelete(false)}>No</button>
                        </div>
                    ):(
                       <div></div>
                    )}
                    <div>
                        {error && (
                            <div className='form-group'>
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            </div>
                        )}
                        <img className="d-block mx-auto mb-4" src="" alt="" width="72" height="57" />
                        <h1 className="display-5 fw-bold"> {movie.name} </h1>
                        <div className="col-lg-6 mx-auto">
                            <p className="lead mb-4"><i> {movie.genres.map((genre, index) => (<b key={index}> {genre} / </b>))} </i></p>
                            <p className="lead mb-4"> {movie.casts.map((actor, index) => (<i key={index}>{actor}, </i>))} </p>
                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                            <Link to={"/movies/edit/" + id} type="button" className="btn btn-primary btn-lg px-4 gap-3">Edit movie</Link>
                            <button type="button" onClick={() => setToDelete(true)} className="btn btn-outline-secondary btn-lg px-4" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Delete movie </span>
                            </button>
                            </div>
                        </div>
                    </div>    
                </div> 
            )}
        </div>    
    )
}