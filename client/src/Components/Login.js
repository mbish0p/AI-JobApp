import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Formik } from 'formik'
import { Link, useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { saveUserData } from '../_actions/userEmployee'

import '../styles/register.css'

const Login = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const accessToken = Cookies.get("jwt_accessToken")
        const refreshToken = Cookies.get("jwt_refreshToken")

        if (accessToken && refreshToken) {
            console.log('I got cookies', accessToken, refreshToken)

            axios({
                method: 'GET',
                withCredentials: true,
                url: 'http://localhost:5000/users'
            }).then((response) => {
                console.log(response)
                dispatch(saveUserData({
                    userId: response.data.id,
                    name: response.data.name,
                    surname: response.data.surname,
                    email: response.data.email
                }))
                history.push('dashboard')
            }).catch((error) => {
                console.log(error)
                if (error.response && error.response.data.error.message === 'jwt expired') {
                    console.log('jwt expired')
                    axios({
                        method: 'POST',
                        withCredentials: true,
                        url: 'http://localhost:5000/users/refresh'
                    }).then((response) => {
                        console.log(response)
                        dispatch(saveUserData({
                            userId: response.data.id,
                            name: response.data.name,
                            surname: response.data.surname,
                            email: response.data.email
                        }))
                        history.push('dashboard')
                    }).catch((error) => {
                        console.log(error.response)
                        setLoading(false)
                    })
                }
                console.log(error.response)
                setLoading(false)
            })
        }
        else {
            setLoading(false)
        }


    }, [])

    return (
        !loading ?
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values, { setSubmitting }) => {
                    axios({
                        method: 'POST',
                        withCredentials: true,
                        url: 'http://localhost:5000/users/login',
                        data: {
                            email: values.email,
                            password: values.password
                        }
                    }).then((response) => {
                        console.log(response)
                        const cookie = Cookies.get("jwt_accessToken")
                        const cookie2 = Cookies.get("jwt_refreshToken")

                        history.push('/dashboard')
                        console.log(cookie, cookie2)
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
                            <div className='registration--container login--container'>
                                <form className='registration--form' autoComplete="off">
                                    <p className='registration--title'>Login</p>
                                    <input placeholder="Email"
                                        name="email"
                                        type='email'
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
            </Formik> :
            <p>Loading ...</p>
    )
}

export default Login