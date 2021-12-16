import React, { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

import { clearedMessage, selectMessage } from "../../state/core/messageSlicer"
import { useAppDispatch, useAppSelector } from "../../state/hooks"
import { forgot } from "../../state/auth/authSlicer"
import { Redirect } from "react-router-dom"


export const ForgetPage = () => {
    const dispatch = useAppDispatch()

    const { message } = useAppSelector(selectMessage)
    const [ sended, setSended ] = useState(false)

    const initialValues = {
        email: ''
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('This field is required!'),
    })

    interface formData {
        email: string
    }

    const handleForget = (formData: formData) => {
        const { email } = formData
        dispatch(forgot( email))
        setSended(true)
    }

    useEffect(() => {
        dispatch(clearedMessage())
        setSended(false)
    }, [dispatch])

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
                                            <h3 className="h4 font-weight-bold text-theme">Forgotten password</h3>
                                        </div>

                                        <p className="text-muted mt-2 mb-5">Enter your email address and we send you email with instructions.</p>

                                        { sended && (message ? (
                                            <div className='form-group'>
                                                <div className="alert alert-danger" role="alert">
                                                    {message}
                                                </div>
                                            </div>
                                        ):(
                                            <div className='form-group'>
                                                <div className="alert alert-success" role="alert">
                                                    <p> Instructions for password reset were send to your email. </p>
                                                </div>
                                            </div>
                                        ))}
                                        

                                        <Formik
                                            initialValues={initialValues}
                                            validationSchema={validationSchema}
                                            onSubmit={handleForget}
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
                                                <button type="submit" className="btn btn-secondary">
                                                    <span>Send reset email</span>
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