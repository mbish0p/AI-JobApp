import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const HeaderMenu = () => {
    const userInfo = useSelector(state => state.user)
    return (
        <div className="header--menu--container">
            <NavLink to={`/job-offers`} className='header--menu-item' activeClassName="header--menu-item-selected">Job offers</NavLink>
            <NavLink exact to={`/company-profiles`} className='header--menu-item' activeClassName="header--menu-item-selected">Company profiles</NavLink>
            <NavLink exact to={`/dashboard`} className='header--menu-item' activeClassName="header--menu-item-selected">Main panel</NavLink>
            <NavLink exact to={`/employee/${userInfo.email}/profile`} className='header--menu-item' activeClassName="header--menu-item-selected">User profile</NavLink>
        </div>
    )
}

export default HeaderMenu