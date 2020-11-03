import React from 'react'

import '../styles/MainPanel.css'

const EmployeerProfileTab = () => {
    return (
        <div className='employeer--profile-tab'>
            <h2 className='employeer--profile-tab-title'>Employeer profile</h2>
            <p className='employeer--profile-tab-content'> Cras consequat, tellus nec efficitur aliquam, risus enim consequat sem, vel condimentum ipsum urna sed est. Sed vel diam nec mi semper semper. Praesent egestas purus eget arcu posuere, sed tincidunt turpis porttitor. Maecenas lobortis feugiat posuere. Cras ut iaculis turpis, eu tristique libero. Nullam vel sodales ex. Nullam a augue sit amet turpis sagittis viverra. Aenean sed ligula sapien. Mauris lacinia congue porttitor.</p>
            <button className='employeer--profile-submit'>Complete profile</button>
        </div>
    )
}

export default EmployeerProfileTab