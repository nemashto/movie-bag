import React from "react";
import { Link } from "react-router-dom";
import {IMovieData} from "../types/Movie";
import { BiWrench, BiX } from "react-icons/bi"


export const Movie = (movie: IMovieData) => {
    const id: string = String(Array(Object.values(movie._id))[0])
    return (
        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
                <h3 className="mb-0">{movie.name}</h3>
                <div className="mb-1 text-muted">{movie.genres.map((genre) => (<b> {genre} / </b>))}</div>
                <div className="card-text mb-auto">{movie.casts.map((actor) => (<i>{actor}, </i>))}</div>
                <Link to={"/movies/" + id} className="stretched-link">detail..</Link>
                <div>
                    <BiWrench />
                    <BiX className="text-danger"/>
                </div>
            </div>
        </div>
    )
}