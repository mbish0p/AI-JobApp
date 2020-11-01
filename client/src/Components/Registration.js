import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Formik } from 'formik'
import * as EmailValidator from 'email-validator'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from "react-alert";
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { saveUserData } from '../_actions/userEmployee'
import { saveEmployeerData } from '../_actions/userEmployeer'

import '../styles/register.css'

const Registration = () => {

    const history = useHistory();
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
                    email: response.data.email,
                    isEmployeer: response.data.isEmployeer
                }))
                if (response.data.isEmployeer) {
                    axios.get('http://localhost:5000/employeer', { withCredentials: true }).then((response) => {
                        dispatch(saveEmployeerData({
                            company_name: response.data.company_name,
                            phone_number: response.data.phone_number,
                            employeerId: response.data.id
                        }))
                        history.push(`/employeer/${response.data.company_name}`)
                    })
                }
                else {
                    history.push('dashboard')
                }
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
                            email: response.data.email,
                            isEmployeer: response.data.isEmployeer
                        }))
                        if (response.data.isEmployeer) {
                            axios.get('http://localhost:5000/employeer', { withCredentials: true }).then((response) => {
                                dispatch(saveEmployeerData({
                                    company_name: response.data.company_name,
                                    phone_number: response.data.phone_number,
                                    employeerId: response.data.id
                                }))
                                history.push(`/employeer/${response.data.company_name}`)
                            })
                        }
                        else {
                            history.push('dashboard')
                        }
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

    const emailsAlreadyInUse = [];
    const alert = useAlert();
    return (
        !loading ?
            <Formik
                initialValues={{ name: "", surname: "", email: "", password: "", repeatedPassword: "" }}
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
                                alert.error("You just broke something :), try once again")
                            }
                        } else {
                            console.log('Submitted')
                            alert.success('Account succesful created')
                        }

                    }).catch((error) => {
                        console.log(error)
                    }).finally(() => {
                        setSubmitting(false)
                    })
                }}
                validate={(values) => {
                    const errors = {}
                    if (emailsAlreadyInUse.includes(values.email)) {
                        errors.email = 'Email is already used';
                    }
                    if (!values.name) {
                        errors.name = "You need provide name property"
                    }
                    if (!values.email) {
                        errors.email = "You need provide email property"
                    }
                    else if (!EmailValidator.validate(values.email)) {
                        errors.email = "This is not email adress"
                    }
                    if (!values.password) {
                        errors.password = "You need provide password property"
                    }
                    if (!values.repeatedPassword) {
                        errors.repeatedPassword = "You need provide repeat password property"
                    }
                    if (values.password !== values.repeatedPassword) {
                        errors.password = "Password and repeat password need to be the same"
                        errors.repeatedPassword = "Password and repeat password need to be the same"
                    }
                    return errors
                }}
            >
                {
                    (props) => {
                        const {
                            values,
                            touched,
                            errors,
                            handleChange,
                            handleBlur,
                            handleSubmit
                        } = props
                        return (
                            <div className='registration--container'>
                                <form className='registration--form' autoComplete="off">
                                    <p className='registration--title'>Create user account</p>
                                    <input placeholder="Name"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={(errors.name && touched.name && "input--error") || 'registration--input'}
                                    />
                                    {
                                        errors.name && touched.name &&
                                        <div>
                                            <p className='registration--error-message'>{errors.name}</p>
                                        </div>
                                    }
                                    <input placeholder="Surname"
                                        name="surname"
                                        value={values.surname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className='registration--input'
                                    />
                                    <input placeholder="Email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={(errors.email && touched.email && "input--error") || 'registration--input'}
                                    />
                                    {
                                        errors.email && touched.email &&
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
                                        className={(errors.password && touched.password && "input--error") || 'registration--input'}
                                    />
                                    {
                                        errors.password && touched.password &&
                                        <div>
                                            <p className='registration--error-message'>{errors.password}</p>
                                        </div>
                                    }
                                    <input placeholder="Repeat password"
                                        name="repeatedPassword"
                                        value={values.repeatedPassword}
                                        onChange={handleChange}
                                        type="password"
                                        onBlur={handleBlur}
                                        className={(errors.repeatedPassword && touched.repeatedPassword && "input--error") || 'registration--input registration--repeat'}
                                    />
                                    {
                                        errors.repeatedPassword && touched.repeatedPassword &&
                                        <div>
                                            <p className='registration--error-message registration--error-message-l '>{errors.repeatedPassword}</p>
                                        </div>
                                    }
                                    {
                                        errors.general &&
                                        <div>
                                            <p className='registration--error-message registration--error-message-l'>{errors.general}</p>
                                        </div>
                                    }

                                    <Link className='transition' to='/login'>If you already have account, login</Link>
                                </form>
                                <button type="submit" className='registration--submit' onClick={handleSubmit} >Registry</button>
                            </div>
                        )
                    }
                }
            </Formik> :
            <p>Loading ...</p>
    )
}

export default Registration