import React from 'react'
import EmployeerHeader from './EmployeerHeader'
import EmployeerSideBar from './EmployeerSideBar'
import EmployeerJobOfferDashboard from './EmployeerJobOfferDashboard'

const EmployeerJobOffer = () => {
    return (
        <div className='dashboard--container'>
            <EmployeerHeader />
            <EmployeerSideBar />
            <EmployeerJobOfferDashboard />
        </div>
    )
}

export default EmployeerJobOffer