import React, { useEffect } from 'react'
import Header from './Header'
import MainJobOfferDashboard from './MainJobOfferDashboard'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveOffers } from '../_actions/offers'

const MainProfilePage = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        refreshToken()
        fetchOffers()
    }, [])

    const fetchOffers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/job-offer/all', { withCredentials: true })
            dispatch(saveOffers(response.data))
        } catch (error) {
            console.log(error)
        }
    }

    const refreshToken = async () => {
        try {
            await axios.post('http://localhost:5000/users/refresh', {}, { withCredentials: true })
        } catch (error) {
            history.push('/')
        }
    }


    return (
        <div className='jobOffer--main-dashboard--container'>
            <Header headerMenu={true} />
            <MainJobOfferDashboard />
        </div>
    )
}

export default MainProfilePage