import React from 'react'
import Logo from './Logo'
import axios from 'axios'
import { ReactComponent as Icon } from '../img/iconfinder_icons_exit2_1564506.svg'
import { useHistory } from 'react-router-dom'

const Header = () => {
    const history = useHistory()

    const handleLogout = () => {
        axios({
            method: 'POST',
            url: 'http://localhost:5000/users/logout',
            withCredentials: true
        }).then((response) => {
            console.log('Access token valid')
            console.log(response)
            history.push('/')
        }).catch((error) => {
            if (error.response.data.error.message === 'jwt expired') {
                console.log('jwt expired')
                axios({
                    method: 'POST',
                    withCredentials: true,
                    url: 'http://localhost:5000/users/refresh'
                }).then((response) => {
                    console.log(response)
                    axios({
                        method: 'POST',
                        url: 'http://localhost:5000/users/logout',
                        withCredentials: true
                    }).then((response) => {
                        console.log('Access token valid')
                        console.log(response)
                        history.push('/')
                    }).catch((error) => {
                        console.log('Error when send second request after validation token')
                        console.log(error.response)
                    })
                }).catch((error) => {
                    console.log('Error when refresing token')
                    console.log(error.response)
                    history.push('/')
                })
            }
            console.log(error.response)
        })
    }

    return (
        <div className='header-container'>
            <Logo />
            <button className='header--employeer-button'>For employeer</button>
            <button onClick={handleLogout} className='header--employeer-logout'>Logout <Icon className='logout-icon' /></button>
        </div>
    )
}

export default Header