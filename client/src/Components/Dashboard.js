import React from 'react'
import Chatbot from './App'
import Header from './Header'
import Sidebar from './SideBar'
import MainDashboard from './MainDashboard'

import '../styles/Dashboard.css'


const Dashboard = () => {
    return (
        <div className='dashboard--container'>
            <Chatbot />
            <Sidebar />
            <Header />
            <MainDashboard />
        </div>
    )
}

export default Dashboard