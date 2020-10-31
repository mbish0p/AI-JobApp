import React from 'react'
import UserLogo from './UserLogo'
import EmployeeInfo from './EmployeeInfo'
import EmployeeMenu from './EmployeeMenu'

import '../styles/Sidebar.css'

const Sidebar = () => {

    return (
        <div className='sidebar--container'>
            <UserLogo />
            <EmployeeInfo />
            <EmployeeMenu />
        </div>
    )

}

export default Sidebar