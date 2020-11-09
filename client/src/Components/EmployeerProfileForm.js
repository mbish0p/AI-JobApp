import React from 'react'
import EmployeerProfileFormBasicInfo from './EmployeerProfileFormBasicInfo'
import EmployeerProfileFormPhotos from './EmployeerProfileFormPhotos'

const EmployeerProfileForm = () => {
    return (
        <div className='main_dashboard--container'>
            <EmployeerProfileFormBasicInfo />
            <EmployeerProfileFormPhotos />
        </div>
    )
}

export default EmployeerProfileForm