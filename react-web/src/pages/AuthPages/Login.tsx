
import React, {useEffect, useState} from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

import { login } from "../../state/auth/authSlicer"
import { clearedMessage, selectMessage, setMessage } from "../../state/core/messageSlicer" 
import { useAppDispatch, useAppSelector } from "../../state/hooks"
import { Redirect, useHistory } from "react-router"
import { Link } from "react-router-dom"

export const LoginPage = () => {
    const [loading, setLoading] = useState(false)

    const { message } = useAppSelector( selectMessage )
    const { isLoggedIn } = useAppSelector((state) => state.auth)

    const dispatch = useAppDispatch()
    const history = useHistory()

    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('This field is required!'),
        password: Yup.string().required('This field is required!')
    })

    interface formData {
        email: string
        password: string
    }

    useEffect(() => {
        dispatch(clearedMessage())
    }, [dispatch])

    const handleLogin = (formData: formData) => {
        setLoading(true)

        dispatch(login(formData))
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

    if (isLoggedIn) {
        return <Redirect to="/" />;
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
                                            <h3 className="h4 font-weight-bold text-theme">Login</h3>
                                        </div>

                                        <h6 className="h5 mb-0">Welcome back!</h6>
                                        <p className="text-muted mt-2 mb-5">Enter your email address and password to access admin panel.</p>

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
                                            onSubmit={handleLogin}
                                        >
                                            <Form>
                                                <div className="form-group">
                                                    <label htmlFor="email">Email address</label>
                                                    <Field name="email" type="text" className="form-control" />
                                                    <ErrorMessage
                                                        name="email"
                                                        component="div"
                                                        className="alert alert-danger"
                                                    />
                                                </div>

                                                <div className="form-group mb-5">
                                                    <label htmlFor="password">Password</label>
                                                    <Field name="password" type="password" className="form-control" />
                                                    <ErrorMessage
                                                        name="password"
                                                        component="div"
                                                        className="alert alert-danger"
                                                    />
                                            </div>

                                            <div className="form-group">
                                                <button type="submit" className="btn btn-secondary" disabled={loading}>
                                                    {loading && (
                                                    <span className="spinner-border spinner-border-sm"></span>
                                                    )}
                                                    <span>Login</span>
                                                </button>
                                                <div className="forgot-link float-right text-primary mt-2">
                                                    <Link to={"/auth/forget"}>Forgot password?</Link>
                                                </div>
                                            </div>

                                            </Form>
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-muted text-center mt-3 mb-0">Don't have an account? <Link to={"/auth/registration"} className="text-primary ml-1">register</Link></p>
                </div>
            </div>
        </div>
    )
}