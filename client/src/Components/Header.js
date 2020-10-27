import React from 'react'
import Logo from './Logo'
import { ReactComponent as Icon } from '../img/iconfinder_icons_exit2_1564506.svg'

const Header = () => {
    return (
        <div className='header-container'>
            <Logo />
            <button className='header--employeer-button'>For employeer</button>
            <button className='header--employeer-logout'>Logout <Icon className='logout-icon' /></button>
        </div>
    )
}

export default Header