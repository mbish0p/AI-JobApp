import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const EmployeeMenu = () => {
    const userInfo = useSelector(state => state.user)

    return (
        <div className='employee--menu'>
            <NavLink exact to={`/dashboard`} className='employee--menu-item' activeClassName="employee--menu-item-selected">Main panel</NavLink>
            <NavLink exact to={`/employee/${userInfo.email}/profile`} className='employee--menu-item' activeClassName="employee--menu-item-selected">User profile</NavLink>
            <NavLink exact to={`/job-offers`} className='employee--menu-item' activeClassName="employee--menu-item-selected">Job offers</NavLink>
            <NavLink exact to={`/applied-offers`} className='employee--menu-item' activeClassName="employee--menu-item-selected">Applied offer</NavLink>
            <NavLink exact to={`/company-profiles`} className='employee--menu-item' activeClassName="employee--menu-item-selected">Company profiles</NavLink>
            <NavLink exact to={`/perfect_employeer`} className='employee--menu-item' activeClassName="employee--menu-item-selected">Perfect employeer</NavLink>
        </div>
    )
}

export default EmployeeMenu