import React from 'react'

import '../styles/MainPanel.css'

const EmployeerOffersTab = () => {
    return (
        <div className='employeer--offers-tab'>
            <h2 className='employeer--offers-tab-title'>Job offers</h2>
            <p className='employeer--profile-tab-content'>Etiam eros nunc, aliquet a porttitor vitae, consectetur eu ante. Phasellus eget sem at orci dictum placerat sed quis enim. Aliquam consectetur, nisl nec vulputate dignissim, ante risus eleifend nunc, scelerisque sodales justo ipsum ut odio. Fusce placerat eleifend pharetra. Aliquam felis lectus, auctor et massa lobortis, sollicitudin facilisis eros.</p>
            <button className='employeer--profile-submit'>Create offer</button>
        </div>
    )
}

export default EmployeerOffersTab