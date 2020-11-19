import React, { useState, useEffect } from 'react'
import EmployeerJobOfferTamplate from './EmployeerJobOfferTamplate'
import EmployeerJobOfferDisplay from './EmployeerJobOfferDisplay'
import { useSelector } from 'react-redux'
import moment from 'moment';
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const EmployeerJobOfferDashboard = () => {
    moment().format();
    const [toggle, setToggle] = useState(false)
    const history = useHistory()
    const employeerInfo = useSelector(state => state.userEmployeer)
    const [offers, setOffers] = useState('')
    const [activeOffers, setActiveOffers] = useState('')
    const [archivalOffers, setArchivalOffers] = useState('')
    const [futureOffers, setFutureOffers] = useState('')

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
            const _activeOffers = []
            const _archivalOffers = []
            const _futureOffers = []
            const now = new Date()
            for (let i = response.length - 1; i >= 0; i--) {
                if (response[i].offer.active) {
                    _activeOffers.push(response[i])
                }
                const endDate = new Date(response[i].offer.end_date)
                const startDate = new Date(response[i].offer.start_date)
                if (endDate < now) {
                    _archivalOffers.push(response[i])
                }
                if (startDate > now) {
                    _futureOffers.push(response[i])
                }
            }
            setActiveOffers(_activeOffers)
            setArchivalOffers(_archivalOffers)
            setFutureOffers(_futureOffers)

            console.log(_futureOffers)
        })
    }, [])

    return (
        <div className='main_dashboard--container'>
            <div className='employeer--job--toggle'>
                <p className={toggle ? 'disactive--string' : 'active--string'} onClick={() => setToggle(false)}>Job offers</p>
                <p className={toggle ? 'active--string' : 'disactive--string'} onClick={() => setToggle(true)}>Create job offer</p>
            </div>
            {
                toggle ? <EmployeerJobOfferTamplate /> : <EmployeerJobOfferDisplay archivalOffers={archivalOffers} activeOffers={activeOffers} futureOffers={futureOffers} />
            }
        </div>
    )
}

export default EmployeerJobOfferDashboard