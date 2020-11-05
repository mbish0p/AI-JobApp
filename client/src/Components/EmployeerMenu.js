import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const EmployeerMenu = () => {
    const employeerInfo = useSelector(state => state.userEmployeer)
    console.log('navigation', employeerInfo)
    return (
        <div className='employee--menu'>
            <NavLink exact to={`/employeer/${employeerInfo.company_name}`} className='employee--menu-item' activeClassName="employee--menu-item-selected">Main panel</NavLink>
            <NavLink exact to={`/employeer/${employeerInfo.company_name}/company-profile`} className='employee--menu-item' activeClassName="employee--menu-item-selected">Employeer profile</NavLink>
            <NavLink exact to={`/employeer/${employeerInfo.company_name}/offers`} className='employee--menu-item' activeClassName="employee--menu-item-selected">Job offers</NavLink>
        </div>
    )
}

export default EmployeerMenu