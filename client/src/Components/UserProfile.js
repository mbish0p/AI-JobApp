import React from 'react'
import Header from './Header'
import Sidebar from './EmployeeSideBar'
import UserProfileDashboard from './UserProfileDashboard'

const UserProfile = () => {
    return (
        <div className='dashboard--container'>
            <Sidebar />
            <Header />
            <UserProfileDashboard />
        </div>
    )
}

export default UserProfile