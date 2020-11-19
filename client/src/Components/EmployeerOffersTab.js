import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import '../styles/MainPanel.css'

const EmployeerOffersTab = () => {
    const history = useHistory()
    const employeerInfo = useSelector(state => state.userEmployeer)

    const transferToJobOffers = () => {
        history.push(`/employeer/${employeerInfo.company_name}/offers`)
    }

    return (
        <div className='employeer--offers-tab'>
            <h2 className='employeer--offers-tab-title'>Job offers</h2>
            <p className='employeer--profile-tab-content'>Etiam eros nunc, aliquet a porttitor vitae, consectetur eu ante. Phasellus eget sem at orci dictum placerat sed quis enim. Aliquam consectetur, nisl nec vulputate dignissim, ante risus eleifend nunc, scelerisque sodales justo ipsum ut odio. Fusce placerat eleifend pharetra. Aliquam felis lectus, auctor et massa lobortis, sollicitudin facilisis eros.</p>
            <button onClick={() => transferToJobOffers()} className='employeer--profile-submit'>Create offer</button>
        </div>
    )
}

export default EmployeerOffersTab