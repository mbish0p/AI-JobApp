import React from 'react'
import logo from '../img/onlinelogomaker-102620-0030-7763.png'
import '../styles/Header.css'
import { useHistory } from 'react-router-dom'

const Logo = () => {
    const history = useHistory()

    const handleLogo = () => {
        history.push('/dashboard')
    }

    return (
        <div className='logo-container' >
            <img src={logo} className='logo' alt='logo' onClick={handleLogo} />
        </div>
    )
}

export default Logo