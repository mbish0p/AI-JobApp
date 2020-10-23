import React from 'react'
import axios from 'axios'
import { Formik } from 'formik'
import * as EmailValidator from 'email-validator'

const Login2 = () => (
    <Formik
        initialValues={{ name: "", surname: "", email: "", password: "", repeatedPassword: "" }}
        onSubmit={(values, { setSubmitting }) => {
            console.log('Submitted')
        }}
        validate={(values) => {
            const errors = {}
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
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit
                } = props
                return (
                    <div>
                        <form>
                            <p>Create user account</p>
                            <input placeholder="Name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.name && touched.name && "error"}
                            />
                            {
                                errors.name && touched.name &&
                                <div>
                                    <p>{errors.name}</p>
                                </div>
                            }
                            <input placeholder="Surname"
                                name="surname"
                                value={values.surname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <input placeholder="Email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.email && touched.email && "error"}
                            />
                            {
                                errors.email && touched.email &&
                                <div>
                                    <p>{errors.email}</p>
                                </div>
                            }
                            <input placeholder="Password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                type="password"
                                onBlur={handleBlur}
                                className={errors.password && touched.password && "error"}
                            />
                            {
                                errors.password && touched.password &&
                                <div>
                                    <p>{errors.password}</p>
                                </div>
                            }
                            <input placeholder="Repeat password"
                                name="repeatedPassword"
                                value={values.repeatedPassword}
                                onChange={handleChange}
                                type="password"
                                onBlur={handleBlur}
                                className={errors.repeatedPassword && touched.repeatedPassword && "error"}
                            />
                            {
                                errors.repeatedPassword && touched.repeatedPassword &&
                                <div>
                                    <p>{errors.repeatedPassword}</p>
                                </div>
                            }
                        </form>
                        <button type="submit" onClick={handleSubmit} >Registry</button>
                    </div>
                )
            }
        }
    </Formik>
)

export default Login2