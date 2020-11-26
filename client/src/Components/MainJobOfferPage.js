import React from 'react'
import Header from './Header'
import MainJobOfferDashboard from './MainJobOfferDashboard'


const MainProfilePage = () => {
    return (
        <div className='jobOffer--main-dashboard--container'>
            <Header headerMenu={true} />
            <MainJobOfferDashboard />
        </div>
    )
}

export default MainProfilePage