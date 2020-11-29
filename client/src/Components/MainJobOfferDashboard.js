import React, { useState } from 'react'
import MainJobOfferHeader from './MainJobOfferHeader'
import filtredOffers from '../_helper/filtredOffers'
import JobOffer from './JobOffer'
import { Pagination } from 'antd';

const MainProfilePageDashboard = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const offers = filtredOffers()

    const handleChangePage = (page) => {
        setCurrentPage(page)
    }

    return (
        <div className='jobOffer--data-container'>
            <MainJobOfferHeader />
            {
                offers ?
                    <div className='offers--container'>
                        {offers.map((offer, index) => {
                            if (index >= (currentPage - 1) * 7 && index < currentPage * 7) {
                                return <JobOffer key={offer.offer.id} offer={offer} />
                            }
                        })}
                        <Pagination className='page-changer' defaultCurrent={1} total={offers.length} defaultPageSize={7} onChange={(page) => handleChangePage(page)} />
                    </div>
                    : <p></p>
            }
        </div>
    )
}

export default MainProfilePageDashboard