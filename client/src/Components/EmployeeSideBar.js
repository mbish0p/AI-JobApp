import React, { useEffect, useState } from 'react'
import UserLogo from './UserLogo'
import EmployeeInfo from './EmployeeInfo'
import EmployeeMenu from './EmployeeMenu'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { saveEmployeePhoto } from '../_actions/userEmployee'

import '../styles/Sidebar.css'

const Sidebar = () => {
    const history = useHistory()
    const [imgUrl, setImgUrl] = useState('')
    const userInfo = useSelector(state => state.userEmployee)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!userInfo.employee_photo) {
            const tryFetchPic = async () => {
                try {
                    const result = await axios.get('http://localhost:5000/employee/image', { withCredentials: true })
                    console.log(result.data)
                    console.log('Successful fetch img url')
                    setImgUrl(result.data.file)
                } catch (error) {
                    console.log(error.response)
                    if (error.response && error.response.data.error.message === 'jwt expired')
                        try {
                            const result = await axios('http://localhost:5000/users/refresh', {
                                withCredentials: true,
                                method: 'POST'
                            })
                            console.log(result)
                            if (result.status === 201) {
                                const finallResult = await axios.get('http://localhost:5000/employee/image', { withCredentials: true })
                                if (finallResult.data.file) {
                                    console.log('Successful fetch img url')
                                    setImgUrl(finallResult.data.file)
                                }
                            }
                        } catch (error) {
                            console.log(error.response)
                            if (error.response.status === 400) {
                                history.push('/')
                            }
                        }
                }
            }
            tryFetchPic()
        } else {
            setImgUrl(userInfo.employee_photo)
        }
    }, [userInfo])


    const setNewImage = (url) => {
        dispatch(saveEmployeePhoto(url))
    }

    return (
        <div className='sidebar--container'>
            <UserLogo setNewImage={setNewImage} imgUrl={imgUrl} />
            <EmployeeInfo />
            <EmployeeMenu />
        </div>
    )

}

export default Sidebar