import React from 'react'
import Logo from './Logo'
import axios from 'axios'
import { ReactComponent as Icon } from '../img/iconfinder_icons_exit2_1564506.svg'
import { useHistory } from 'react-router-dom'
import HeaderMenu from './HeaderMenu'

import refreshToken from '../_helper/refreshToken'

const Header = (props) => {
    const history = useHistory()

    const handleLogout = () => {
        const responseFunction = () => {
            console.log('Successful logout')
            history.push('/')
        }
        const responseObject = {
            method: 'POST',
            url: 'http://localhost:5000/users/logout',
            withCredentials: true
        }
        axios({
            method: 'POST',
            url: 'http://localhost:5000/users/logout',
            withCredentials: true
        }).then((response) => {
            console.log('Access token valid')
            console.log(response)
            history.push('/')
        }).catch((error) => {
            refreshToken(error, history, responseFunction, responseObject)
        })
    }

    const handleEmployeerButton = () => {
        history.push('/employeer')
    }

    return (
        <div className='header-container'>
            <Logo />
            {
                props.headerMenu ? <HeaderMenu /> : ''
            }
            <button className='header--employeer-button' onClick={(e) => handleEmployeerButton()}>For employeer</button>
            <button onClick={handleLogout} className='header--employeer-logout'>Logout <Icon className='logout-icon' /></button>
        </div>
    )
}

export default Header