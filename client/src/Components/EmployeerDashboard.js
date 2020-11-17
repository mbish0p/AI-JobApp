import React, { useEffect, useState } from 'react'
import EmployeerHeader from './EmployeerHeader'
import EmployeerSideBar from './EmployeerSideBar'
import EmployeerMainDashboard from './EmployeerMainDashboard'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveEmployeerData } from '../_actions/userEmployeer'
import { saveUserData } from '../_actions/userEmployee'

const EmployeerDashboard = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [offers, setOffers] = useState([])
    const [activeOffers, setActiveOffers] = useState([])

    useEffect(() => {
        const tryFetchPic = async () => {
            try {
                const response = await axios.get('http://localhost:5000/employeer', { withCredentials: true })
                console.log(response.data)
                console.log('Successful fetch employeer profile')
                dispatch(saveEmployeerData({
                    company_name: response.data.company_name,
                    phone_number: response.data.phone_number,
                    employeerId: response.data.id,
                    company_logo: response.data.company_logo
                }))
                const userResponse = await axios.get('http://localhost:5000/users', { withCredentials: true })
                dispatch(saveUserData({
                    userId: userResponse.data.id,
                    name: userResponse.data.name,
                    surname: userResponse.data.surname,
                    email: userResponse.data.email,
                    isEmployeer: userResponse.data.isEmployeer
                }))
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
                            dispatch(saveEmployeerData({
                                company_name: finallResult.data.company_name,
                                phone_number: finallResult.data.phone_number,
                                employeerId: finallResult.data.id,
                                company_logo: finallResult.data.company_logo
                            }))

                            const userResponse = await axios.get('http://localhost:5000/users', { withCredentials: true })
                            dispatch(saveUserData({
                                userId: userResponse.data.id,
                                name: userResponse.data.name,
                                surname: userResponse.data.surname,
                                email: userResponse.data.email,
                                isEmployeer: userResponse.data.isEmployeer
                            }))
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
    }, [])

    const fetchOffers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/job-offer', { withCredentials: true })
            console.log(response)
            setOffers(response.data)
            return response.data
        } catch (error) {
            console.log(error)
            console.log(error.response)
            if (error.response && error.response.data.error.message === 'jwt expired') {
                try {
                    const result = await axios('http://localhost:5000/users/refresh', {
                        withCredentials: true,
                        method: 'POST'
                    })
                    console.log(result)
                    if (result.status === 201) {
                        const finallResult = await axios.get('http://localhost:5000/job-offer', { withCredentials: true })
                        console.log('Successful fetch employeer offers')
                        setOffers(finallResult.data)
                        return finallResult.data
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
    }

    useEffect(() => {
        fetchOffers().then((response) => {
            console.log('sraka', response)
            const activeOffers = []
            for (let i = response.length - 1; i >= 0; i--) {
                if (response[i].offer.active) {
                    activeOffers.push(response[i])
                }
            }
            setActiveOffers(activeOffers)
        })
    }, [])

    return (
        <div className='dashboard--container'>
            <EmployeerHeader />
            <EmployeerSideBar />
            <EmployeerMainDashboard activeOffers={activeOffers} />
        </div>
    )
}

export default EmployeerDashboard