import React from 'react'
import MainJobOfferHeader from './MainJobOfferHeader'
import filtredOffers from '../_helper/filtredOffers'

const MainProfilePageDashboard = () => {

    console.log(filtredOffers())

    return (
        <div className='jobOffer--data-container'>
            <MainJobOfferHeader />
        </div>
    )
}

export default MainProfilePageDashboard