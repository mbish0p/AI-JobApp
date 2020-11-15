import React from 'react'
import EmployeerProfileFormBasicInfo from './EmployeerProfileFormBasicInfo'
import EmployeerProfileFormPhotos from './EmployeerProfileFormPhotos'
import EmployeerProfileTextEditor from './EmployeerProfileTextEditors'

const EmployeerProfileForm = () => {
    return (
        <div className='main_dashboard--container'>
            <div className='employeer--main_dashboard--container'>
                <div className='employeer--main_dashboard--container-leftside'>
                    <EmployeerProfileFormBasicInfo />
                    <EmployeerProfileTextEditor />
                </div>
                <div className='employeer--main_dashboard--container-rightside'>
                    <EmployeerProfileFormPhotos />
                </div>
            </div>
        </div>
    )
}

export default EmployeerProfileForm