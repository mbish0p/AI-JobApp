import React from 'react'
import EmployeerProfileTab from './EmployeerProfileTab'
import EmployeerOffersTab from './EmployeerOffersTab'
import EmployeerJobOfferTab from './EmployeerJobOfferTab'


const EmployeerMainDashboard = (props) => {
    return (
        <div className='main_dashboard--container'>
            <div className='main_dashboard--top'>
                <EmployeerProfileTab />
                <EmployeerOffersTab />
            </div>
            <EmployeerJobOfferTab activeOffers={props.activeOffers} />
        </div>
    )
}

export default EmployeerMainDashboard