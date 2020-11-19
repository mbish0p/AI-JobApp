import React, { useEffect, useState } from 'react'
import UserLogo from './UserLogo'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { saveEmployeerLogo } from '../_actions/userEmployeer'
import EmployeerInfo from './EmployeerInfo'
import EmployeerMenu from './EmployeerMenu'


import '../styles/Sidebar.css'

const Sidebar = () => {
    const history = useHistory()
    const [imgUrl, setImgUrl] = useState('')
    const employeerInfo = useSelector(state => state.userEmployeer)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!employeerInfo.company_logo) {
            const tryFetchPic = async () => {
                try {
                    const result = await axios.get('http://localhost:5000/employeer', { withCredentials: true })
                    console.log('Successful fetch employeer profile')
                    if (result.data.employeer.company_logo) {
                        setImgUrl(result.data.employeer.company_logo)
                    }
                } catch (error) {
                    console.log(error)
                    console.log(error.response)
                    if (error.response && error.response.data.error.message === 'jwt expired')
                        try {
                            const result = await axios('http://localhost:5000/users/refresh', {
                                withCredentials: true,
                                method: 'POST'
                            })
                            console.log(result)
                            if (result.status === 201) {
                                const finallResult = await axios.get('http://localhost:5000/employeer', { withCredentials: true })
                                if (finallResult.data.employeer.company_logo) {
                                    console.log('Successful fetch employeer profile')
                                    setImgUrl(finallResult.data.employeer.company_log)
                                }
                            }
                        } catch (error) {
                            console.log(error)
                            console.log(error.response)
                            if (error.response.status === 400) {
                                history.push('/')
                            }
                        }
                }
            }
            tryFetchPic()
        } else {
            setImgUrl(employeerInfo.company_logo)
        }
    }, [employeerInfo])

    const setNewImage = (url) => {
        console.log('...dispatching')
        dispatch(saveEmployeerLogo(url))
    }

    return (
        <div className="sidebar--container">
            <UserLogo setImgUrl={setNewImage} imgUrl={imgUrl} />
            <EmployeerInfo />
            <EmployeerMenu />
        </div>
    )

}

export default Sidebar