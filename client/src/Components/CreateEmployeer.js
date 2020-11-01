import React from 'react'
import axios from 'axios'
import { Formik } from 'formik'
import { error } from 'actions-on-google/dist/common'

const CreateEmployeer = () => {
    return (
        <Formik
            initialValues={{ company_name: "", phone_number: "", regulamin: false, newsletter: false }}
            onSubmit={(values, { setSubmitting }) => {
                console.log('dupka')
            }}
            validate={(values) => {
                const errors = {}
                if (!values.company_name) {
                    errors.company_name = "You need provide company name"
                }
                if (!values.phone_number) {
                    errors.phone_number = "You need provide phone number"
                }
                if (!values.regulamin) {
                    errors.regulamin = "You need accept regulamin"
                }
                console.log(errors)
                return errors
            }}
        >
            {
                (props) => {
                    const {
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    } = props
                    return (
                        <div className='company--profile-container'>
                            <form className='registration--form company--registration-form' autoComplete="off">
                                <p className='company--label'>Company name</p>
                                <input
                                    name="company_name"
                                    value={values.company_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={(errors.company_name && touched.company_name && "company--input-error") || 'company--registration-input'}
                                />
                                {
                                    errors.company_name && touched.company_name &&
                                    <div>
                                        <p className='registration--error-message company--error-message'>{errors.company_name}</p>
                                    </div>
                                }
                                <p className='company--label'>Phone number</p>
                                <input
                                    name="phone_number"
                                    value={values.phone_number}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={(errors.phone_number && touched.phone_number && "company--input-error") || 'company--registration-input'}
                                />
                                {
                                    errors.phone_number && touched.phone_number &&
                                    <div>
                                        <p className='registration--error-message company--error-message'>{errors.phone_number}</p>
                                    </div>
                                }
                                <div className='company--checkbox-div'>
                                    <input
                                        name="regulamin"
                                        type='checkbox'
                                        value={values.regulamin}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={(errors.regulamin && touched.regulamin && "company--input-error") || 'registration--checkbox'}
                                    />
                                    <p className='company--checkbox-p'>I agree with regulations on webpage</p>
                                </div>
                                {
                                    errors.regulamin && touched.regulamin &&
                                    <div>
                                        <p className='registration--error-message company--error-message'>{errors.regulamin}</p>
                                    </div>
                                }
                                <div className='company--checkbox-div'>
                                    <input
                                        name="newsletter"
                                        type='checkbox'
                                        value={values.newsletter}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={(errors.newsletter && "company--input-error") || 'registration--checkbox'}
                                    />
                                    <p className='company--checkbox-p' >I agree to get newsletter</p>
                                </div>
                                {
                                    errors.general &&
                                    <div>
                                        <p className='registration--error-message registration--error-message-l'>{errors.general}</p>
                                    </div>
                                }
                                <button type="submit" className='registration--submit company--registration-submit' onClick={handleSubmit} >Create free company profie</button>
                            </form>
                        </div>
                    )
                }
            }
        </Formik>
    )
}

export default CreateEmployeer


