import React, { useEffect, useState } from 'react'
import Header from './Header'
import JobOfferMainDashboard from './JobOfferMainDashboard'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import '../styles/MainJobOffer.css'

const JobOfferMainCard = (props) => {
    const history = useHistory()
    const [offer, setOffer] = useState('')

    useEffect(() => {
        const url = window.location.href
        const idIndex = url.indexOf('job-offers/') //11
        const id = parseInt(url.slice(idIndex + 11))
        fetchJobOffer(id)
    }, [])

    const fetchJobOffer = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/job-offer/${id}`, { withCredentials: true })
            console.log(response)
            setOffer({
                offer: response.data.offer,
                techs: response.data.technology
            })
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
                        const response = await axios.get(`http://localhost:5000/job-offer/${id}`, { withCredentials: true })
                        console.log(response)
                        setOffer({
                            offer: response.data.offer,
                            techs: response.data.technology
                        })
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
    console.log(offer)
    return (
        <div className='jobOffer--main-dashboard--container'>
            <Header headerMenu={true} />
            <JobOfferMainDashboard offer={offer} />
        </div>
    )
}

export default JobOfferMainCard