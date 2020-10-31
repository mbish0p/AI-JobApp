import React from 'react'
import UserLogo from './UserLogo'
import EmployeeInfo from './EmployeeInfo'

import '../styles/Sidebar.css'

const Sidebar = () => {

    return (
        <div className='sidebar--container'>
            <UserLogo />
            <EmployeeInfo />
        </div>
    )

}

export default Sidebar