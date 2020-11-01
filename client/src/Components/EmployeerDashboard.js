import React from 'react'
import EmployeerHeader from './EmployeerHeader'
import EmployeerSideBar from './EmployeerSideBar'
import EmployeerMainDashboard from './EmployeerMainDashboard'

const EmployeerDashboard = () => {
    return (
        <div className='dashboard--container'>
            <EmployeerHeader />
            <EmployeerSideBar />
            <EmployeerMainDashboard />
        </div>
    )
}

export default EmployeerDashboard