import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { saveUserData } from '../_actions/userEmployee'

const EmployeeInfo = () => {

    const userInfo = useSelector(state => state.user)
    const dispatch = useDispatch()

    if (!userInfo.userId) {
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

                }).catch((error) => {
                    console.log(error.response)
                })
            }
            console.log(error.response)
        })
    }
    return (
        <div className="employee--info">
            <h3 className='employee--name'>{userInfo.name}</h3>
            <h3 className='employee--surname'> {userInfo.surname}</h3>
        </div>
    )
}

export default EmployeeInfo