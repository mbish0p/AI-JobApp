import React from 'react'
import moment from 'moment';

import '../styles/MainPanel.css'

const EmployeerJobOfferTab = (props) => {
    moment().format();

    return (
        <div className="employeer--offer-tab-container">
            <h2 className="employeer--offer-tab-title">Job offers</h2>
            <div className="employeer--offer-tab-header">
                <p className="employeer--offer-tab-name">Offer name</p>
                <p className="employeer--offer-tab-start">Start date</p>
                <p className="employeer--offer-tab-end">End date</p>
            </div>
            {
                props.activeOffers.map((offer, index) => {
                    const startDate = moment(offer.offer.start_date).format("D MMMM YYYY")
                    const endDate = moment(offer.offer.end_date).format("D MMMM YYYY")
                    return <div key={index} className='employeer--offer--istance'>
                        <p className='employeer--offer--istance-name'>{offer.offer.title}</p>
                        <p className='employeer--offer--istance-start-date'>{startDate}</p>
                        <p className='employeer--offer--istance-end-date'>{endDate}</p>
                    </div>
                })
            }
        </div>
    )
}

export default EmployeerJobOfferTab