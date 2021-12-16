import React, { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

import { clearedMessage, selectMessage } from "../../state/core/messageSlicer"
import { useAppDispatch, useAppSelector } from "../../state/hooks"
import { reset } from "../../state/auth/authSlicer"
import { Redirect, useParams } from "react-router-dom"

type ResetParams = {
    reset_token: string
}

export const ResetPage = () => {
    const dispatch = useAppDispatch()

    const {reset_token } = useParams<ResetParams>()
    const { message } = useAppSelector(selectMessage)
    const [ sended, setSended ] = useState(false)

    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('No password provided.') 
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })

    interface formData {
        password: string
    }

    const handleReset= (formData: formData) => {
        const { password } = formData
        dispatch(reset( {password, reset_token }))
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
                                            <h3 className="h4 font-weight-bold text-theme">Reset password</h3>
                                        </div>


                                        <p className="text-muted mt-2 mb-5">Enter your new password</p>

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
                                            onSubmit={handleReset}
                                        >
                                            <Form>

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