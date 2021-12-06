import React from "react";
import IMovieData from "../types/Movie";


export const Movie = (movie: IMovieData) => {
    return (
        <div className="col-md-6">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                    <h3 className="mb-0">{movie.name}</h3>
                    <div className="mb-1 text-muted">{movie.genres}</div>
                    <div className="card-text mb-auto">{movie.casts.map((actor) => (<i>{actor}, </i>))}</div>
                    <a href="#" className="stretched-link">detail..</a>
                </div>
            </div>
        </div>
    )
}