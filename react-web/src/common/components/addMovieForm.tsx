import React, { useState } from "react";
import { 
    Formik,
    Form,
    Field,
    FieldArray,
} from "formik"
import { IMovieInputData } from "../types/Movie";

export const AddMovieForm = (initialValues: IMovieInputData , saveMovie: Function) => {
    const [submitted, setSubmitted] = useState(false)



    const validate = (value: string) =>{
        let error: string
        error = ''
        if (!value) {
            error = "required"
        }
        return error
    }

    const newForm = () => {
        setSubmitted(false)
    }

    return(
    <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={newForm}>
              Add
            </button>
          </div>
        ) : (
        <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    saveMovie(values)
                    setSubmitted(true)
                    actions.resetForm()
                }}
            >
            {({ values, errors, touched }) => (
                    <Form>
                        <div className="row g-3">
                            <div className="">
                                <label className="form-label my-2" htmlFor="name">movie name</label>
                                <Field className="form-control" validate={validate} id="name" name="name" placeholder="movie name" />
                                {errors.name && touched.name && <div className="text-danger">{errors.name}</div>}

                                <label className="form-label my-2" htmlFor="genres">genres</label>
                                <FieldArray 
                                    name="genres"
                                    render={genresHelpers => (
                                        <div>
                                            {values.genres && values.genres.length > 0 ? (
                                                values.genres.map((genre, index) => (
                                                    <div key={index} className="input-group  ">
                                                        <Field name={`genres.${index}`} className="form-control" />
                                                        <button type="button" className="btn input-group-text" onClick={() => genresHelpers.remove(index)}>
                                                            -
                                                        </button>
                                                        <button type="button" className="btn input-group-text" onClick={() => genresHelpers.insert(index, '')}>
                                                            +
                                                        </button>
                                                    </div>
                                                ))
                                            ) : (
                                                <button type="button" className="btn btn-primary" onClick={() => genresHelpers.push('')}>
                                                    add genre
                                                </button>
                                            )
                                            
                                            }
                                        </div>
                                        
                                    )}
                                />
                                

                                <label className="form-label my-2" htmlFor="casts">casts</label>
                                <FieldArray 
                                    name="casts"
                                    render={castsHelpers => (
                                        <div>
                                            {values.casts && values.casts.length > 0 ? (
                                                values.casts.map((cast, index) => (
                                                    <div key={index} className="input-group  ">
                                                        <Field name={`casts.${index}`} className="form-control" validate={validate} />
                                                        <button type="button" className="btn input-group-text" onClick={() => castsHelpers.remove(index)}>
                                                            -
                                                        </button>
                                                        <button type="button" className="btn input-group-text" onClick={() => castsHelpers.insert(index, '')}>
                                                            +
                                                        </button>
                                                    </div>
                                                ))
                                            ) : (
                                                <button type="button" className="btn btn-primary" onClick={() => castsHelpers.push('')}>
                                                    add cast
                                                </button>
                                            )
                                            
                                            }
                                        </div>
                                    )}
                                />

                            </div>
                            <div className="py-3">
                                <button className="w-100 btn btn-primary btn-lg" type="submit">Submit</button>
                            </div>
                        </div>
                    </Form>
                )}
        </Formik>
        )}
        </div>
    )
}