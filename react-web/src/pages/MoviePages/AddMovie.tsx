import React from "react"
import { 
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps, 
} from "formik"

interface IMovieInputData {
    name: string,
    genres: string[],
    casts: string[],
}

export const AddMovie = () => {
    const initialValues: IMovieInputData = {
        name: '',
        genres: [],
        casts: [],
    }

    return (
        <div className="row bg-white d-flex justify-content-center">
            <div className="col-md-7 py-3 text-center">
                <div className="">
                    <h2>Add Movie</h2>
                    <p className="lead">Please fill your movie to this form.</p>
                </div>
            </div>

            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    console.log({ values, actions })
                    actions.setSubmitting(false)
                }}
            >
                <Form>
                    <div className="row g-3">
                        <div className="col-12">
                            <label className="form-label" htmlFor="name"></label>
                            <Field className="form-control" id="name" name="name" placeholder="Movie Name" />
                        </div>
                        <div className="py-3 col-12">
                            <button className="w-100 btn btn-primary btn-lg" type="submit">Submit</button>
                        </div>
                    </div>
                    
                </Form>
            </Formik>
        </div>
    )
}