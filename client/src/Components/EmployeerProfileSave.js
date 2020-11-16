import React from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const EmployeerProfileSave = () => {
    const history = useHistory()
    const employeerInfo = useSelector(state => state.userEmployeer)

    const refreshToken = async () => {
        try {
            await axios.post('http://localhost:5000/users/refresh', {}, { withCredentials: true })
        } catch (error) {
            history.push('/')
        }
    }

    const updateCompanyProfile = (e) => {
        refreshToken()
    }

    return (
        <div className='employeer--save--container'>
            <button onClick={(e) => updateCompanyProfile(e)} className="employeer--basic-info--removeoffice employeer--save--update">Update</button>
            <button className='employeer--basic-info--removeoffice employeer--save--preview'>Preview</button>
        </div>
    )
}

export default EmployeerProfileSave