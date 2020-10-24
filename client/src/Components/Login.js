import React from 'react'
import axios from 'axios'
import { Formik } from 'formik'
import { Link } from 'react-router-dom'

import '../styles/register.css'

const Login = () => {

    const emailsAlreadyInUse = [];
    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting, setFieldError }) => {
                axios({
                    method: 'POST',
                    url: 'http://localhost:5000/users',
                    data: {
                        name: values.name,
                        surname: values.surname,
                        email: values.email,
                        password: values.password
                    }
                }).then((response) => {
                    console.log(response)
                    console.log('Submitted')
                    if (response.data.error) {
                        if (response.data.message.errors[0].message === "email must be unique") {
                            setFieldError('email', 'Email is already used')
                            emailsAlreadyInUse.push(response.data.message.errors[0].value);
                        }
                    }

                }).catch((error) => {
                    console.log(error)
                }).finally(() => {
                    setSubmitting(false)
                })
            }}
            validate={(values) => {
                const errors = {}
                if (!values.email) {
                    errors.email = "You need provide email property"
                }
                if (!values.password) {
                    errors.password = "You need provide password property"
                }
                return errors
            }}
        >
            {
                (props) => {
                    const {
                        values,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    } = props
                    return (
                        <div className='registration--container'>
                            <form className='registration--form' autoComplete="off">
                                <p className='registration--title'>Login</p>
                                <input placeholder="Email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={(errors.email && "input--error") || 'registration--input'}
                                />
                                {
                                    errors.email &&
                                    <div>
                                        <p className='registration--error-message'>{errors.email}</p>
                                    </div>
                                }
                                <input placeholder="Password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    type="password"
                                    onBlur={handleBlur}
                                    className={(errors.password && "input--error") || 'registration--input'}
                                />
                                {
                                    errors.password &&
                                    <div>
                                        <p className='registration--error-message'>{errors.password}</p>
                                    </div>
                                }
                                {
                                    errors.general &&
                                    <div>
                                        <p className='registration--error-message registration--error-message-l'>{errors.general}</p>
                                    </div>
                                }

                                <Link className='transition' to='/'>Create account</Link>
                            </form>
                            <button type="submit" className='registration--submit' onClick={handleSubmit} >Login</button>
                        </div>
                    )
                }
            }
        </Formik>
    )
}

export default Login