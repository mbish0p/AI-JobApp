import React, { useEffect, useState } from 'react'
import axios from 'axios'

const JobOffer = (props) => {
    const [employeerProfile, setEmployeerProfile] = useState({})

    const fetchEmployeerProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/employeer/${props.offer.offer.employeerId}`)
            await setEmployeerProfile(response.data)
        } catch (error) {
            console.log(error.response)
        }
    }
    useEffect(() => {
        fetchEmployeerProfile()
    }, [])

    return (
        <div className='joboffer--tamplate'>
            <h3 className='joboffer--title'>{props.offer.offer.title} {props.offer.offer.online_interview ? 'Online recruitment' : ''}</h3>
            <img className='joboffer--company-logo' src={employeerProfile.company_logo} alt='company_logo' />
            <p className='joboffer--company-name'>{employeerProfile.company_name}</p>
            <p className='joboffer--city'>{props.offer.offer.city} {props.offer.offer.remote_work ? 'Remotly' : ''}</p>
            <div className='joboffer--technologies'>
                {
                    props.offer.technology.map((technology, index) => {
                        return <p className='joboffer--technology'>{technology.name}</p>
                    })
                }
            </div>
        </div>
    )
}

export default JobOffer