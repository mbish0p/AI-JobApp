import React from 'react'
import EmployeerHeader from './EmployeerHeader'
import EmployeerSideBar from './EmployeerSideBar'
import EmployeerJobOfferTamplate from './EmployeerJobOfferTamplate'

const EmployeerJobOffer = () => {
    return (
        <div className='dashboard--container'>
            <EmployeerHeader />
            <EmployeerSideBar />
            <EmployeerJobOfferTamplate />
        </div>
    )
}

export default EmployeerJobOffer