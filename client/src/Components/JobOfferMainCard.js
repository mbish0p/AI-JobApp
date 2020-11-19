import React from 'react'
import Header from './Header'
import JobOfferMainDashboard from './JobOfferMainDashboard'

import '../styles/MainJobOffer.css'

const JobOfferMainCard = () => {
    return (
        <div className='jobOffer--main-dashoboard--container'>
            <Header headerMenu={true} />
            <JobOfferMainDashboard />
        </div>
    )
}

export default JobOfferMainCard