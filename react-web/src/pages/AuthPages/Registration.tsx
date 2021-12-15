import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"
import React, {useEffect, useState} from "react"
import { clearedMessage, selectMessage, setMessage } from "../../state/core/messageSlicer"
import { useAppDispatch, useAppSelector } from "../../state/hooks"
import { regisration } from "../../state/auth/authSlicer"
import { useHistory } from "react-router"



export const RegistrationPage = () => {
    const [loading, setLoading] = useState(false)

    const { message } = useAppSelector(selectMessage)

    const dispatch = useAppDispatch()
    const history = useHistory()

    interface formData {
        email: string
        password: string
    }

    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('This field is required!'),
        password: Yup.string()
            .required('No password provided.') 
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })

    useEffect(() => {
        dispatch(clearedMessage())
    },[dispatch])

    const handleSubmit = (formData: formData) => {
        setLoading(true)

        dispatch(regisration(formData))
            .unwrap()
            .then(() => {
                history.push("/")
                window.location.reload()
            })
            .catch(() => {
                setLoading(false)
                dispatch(setMessage("Wrong email or password"))
            })
    }


    return (
        <div id="main-wrapper" className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10">
                    <div className="card border-0">
                        <div className="card-body p-0">
                            <div className="row no-gutters">
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="mb-5">
                                            <h3 className="h4 font-weight-bold text-theme">Sign up a new user</h3>
                                        </div>
                                        <h6 className="h5 mb-0">Welcome!</h6>
                                        <p className="text-muted mt-2 mb-5">Enter your email address and password to register your account.</p>

                                        {message && (
                                            <div className='form-group'>
                                                <div className="alert alert-danger" role="alert">
                                                    {message}
                                                </div>
                                            </div>
                                         )}

                                         <Formik
                                            initialValues={initialValues}
                                            validationSchema={validationSchema}
                                            onSubmit={handleSubmit}
                                        >

                                            <Form>
                                                <div className="form-group mb-5">
                                                    <label htmlFor="email">Email address</label>
                                                    <Field name="email" type="text" className="form-control" />
                                                    <ErrorMessage
                                                        name="email"
                                                        component="div"
                                                        className="alert alert-danger"
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="password">Password</label>
                                                    <Field name="password" type="passwordA" className="form-control" />
                                                    <ErrorMessage
                                                        name="password"
                                                        component="div"
                                                        className="alert alert-danger"
                                                    />
                                                </div>

                                                <div className="form-group mb-5">
                                                    <label htmlFor="passwordConfirmation">Password again</label>
                                                    <Field name="passwordConfirmation" type="passwordA" className="form-control" />
                                                    <ErrorMessage
                                                        name="passwordConfirmation"
                                                        component="div"
                                                        className="alert alert-danger"
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <button type="submit" className="btn btn-secondary" disabled={loading}>
                                                        {loading && (
                                                        <span className="spinner-border spinner-border-sm"></span>
                                                        )}
                                                        <span>Sign up</span>
                                                    </button>
                                                </div>

                                            </Form>

                                        </Formik>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}