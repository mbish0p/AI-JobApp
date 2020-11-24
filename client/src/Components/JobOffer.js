import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Location from '../img/placeholder.svg'
import Remote from '../img/online-support.svg'
import DefaultCompanyLogo from '../img/logo-default.svg'
import {useHistory} from 'react-router-dom'

import '../styles/JobOffer.css'

const JobOffer = (props) => {
    const history = useHistory()
    const [employeerProfile, setEmployeerProfile] = useState({})

    const fetchEmployeerProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/employeer/${props.offer.offer.employeerId}`)
            console.log(response)
            await setEmployeerProfile(response.data.employeer)
        } catch (error) {
            console.log(error.response)
        }
    }
    useEffect(() => {
        fetchEmployeerProfile()
    }, [])

    const transferToJobOffer = ()=>{
        history.push(`/job-offers/${props.offer.offer.id}`)
    }

    return (
        <div className='joboffer--tamplate' onClick = {()=>transferToJobOffer()}>
        `   <img className='joboffer--company-logo' src={employeerProfile.company_logo || DefaultCompanyLogo} alt='company_logo' />
            <div className = 'joboffer--job-info'>
                <div className = 'joboffer--header'>
                    <h3 className='joboffer--title'>{props.offer.offer.title} {props.offer.offer.online_interview ?
                         <p className = 'joboffer--online-recruiment'>
                         <img src={Remote} alt="Remote Logo"  className = 'joboffer--remote-icon'/>
                         Online recruitment</p>
                         : ''}</h3>
                <div className='joboffer--technologies'>
                    {
                        props.offer.technology.map((technology, index) => {
                            return <p key={index} className='joboffer--technology'>{technology.name}</p>
                        })
                    }
                </div>
                </div>
                <div className = 'joboffer--footer'>
                    <p className='joboffer--company-name'>{employeerProfile.company_name}</p>
                    <p className='joboffer--city'>
                    <img src={Location} alt="Location Logo"  className = 'joboffer--location-icon'/>
                    {props.offer.offer.city}, {props.offer.offer.remote_work ? 'Remotly' : ''}</p>
                    <p className='joboffer--salary'>{props.offer.offer.min_salary} - {props.offer.offer.max_salary}</p>
                </div>
            </div>
        </div>
    )
}

export default JobOffer