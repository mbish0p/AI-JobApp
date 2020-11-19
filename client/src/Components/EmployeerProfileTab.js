import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import '../styles/MainPanel.css'

const EmployeerProfileTab = () => {
    const history = useHistory()
    const employeerInfo = useSelector(state => state.userEmployeer)

    const transferToEmployeerProfile = () => {
        history.push(`/employeer/${employeerInfo.company_name}/company-profile`)
    }

    return (
        <div className='employeer--profile-tab'>
            <h2 className='employeer--profile-tab-title'>Employeer profile</h2>
            <p className='employeer--profile-tab-content'> Cras consequat, tellus nec efficitur aliquam, risus enim consequat sem, vel condimentum ipsum urna sed est. Sed vel diam nec mi semper semper. Praesent egestas purus eget arcu posuere, sed tincidunt turpis porttitor. Maecenas lobortis feugiat posuere. Cras ut iaculis turpis, eu tristique libero. Nullam vel sodales ex. Nullam a augue sit amet turpis sagittis viverra. Aenean sed ligula sapien. Mauris lacinia congue porttitor.</p>
            <button className='employeer--profile-submit' onClick={() => transferToEmployeerProfile()}>Complete profile</button>
        </div>
    )
}

export default EmployeerProfileTab