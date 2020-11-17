import React from 'react'
import EmployeerHeader from './EmployeerHeader'
import EmployeerSideBar from './EmployeerSideBar'
import EmployeerProfileForm from './EmployeerProfileForm'

const EmployeerProfile = () => {
    return (
        <div className='dashboard--container'>
            <EmployeerHeader />
            <EmployeerSideBar />
            <EmployeerProfileForm />
        </div>
    )
}

export default EmployeerProfile