import React from "react"
import { AddMovieForm } from "../../common/components/addMovieForm"
import { IMovieInputData } from "../../common/types/Movie";
import { createMovie } from "../../state/movies/moviesSlicer";
import { useAppDispatch} from "../../state/hooks";

export const AddMovie = () => {
    const dispatch = useAppDispatch()

    const initialValues: IMovieInputData = {
        name: '',
        genres: [],
        casts: [],
    }

    const saveMovie = (values: IMovieInputData) => {
        dispatch(createMovie(values))
    }

    return (
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