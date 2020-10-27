import React from 'react'
import logo from '../img/onlinelogomaker-102620-0030-7763.png'
import '../styles/Header.css'

const Logo = () => {
    return (
        <div className='logo-container' >
            <img src={logo} className='logo' alt='logo' />
        </div>
    )
}

export default Logo