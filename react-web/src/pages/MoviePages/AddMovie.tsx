import React from "react"
import { AddMovieForm } from "../../common/components/addMovieForm"

export const AddMovie = () => {

    return (
        <div className="row col-8 bg-white d-flex justify-content-center">
            <div className="py-3 text-center">
                <div className="">
                    <h2>Add Movie</h2>
                    <p className="lead">Please fill your movie to this form.</p>
                </div>
            </div>
            <AddMovieForm />
         </div>
    )
}