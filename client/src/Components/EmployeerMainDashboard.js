import React from 'react'
import EmployeerProfileTab from './EmployeerProfileTab'
import EmployeerOffersTab from './EmployeerOffersTab'


const EmployeerMainDashboard = () => {
    return (
        <div className='main_dashboard--container'>
            <div className='main_dashboard--top'>
                <EmployeerProfileTab />
                <EmployeerOffersTab />
            </div>
        </div>
    )
}

export default EmployeerMainDashboard