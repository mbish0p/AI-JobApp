import React from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const EmployeerJobOfferSave = () => {
    const history = useHistory()
    const {
        job_category,
        offer_title,
        experience_level,
        city,
        street,
        remote_work,
        contract_type,
        min_salary,
        max_salary,
        description,
        recruitmentOnline,
        start_date,
        education,
        end_date,
        currency,
        technologies
    } = useSelector(state => state.jobOffer)

    const refreshToken = async () => {
        try {
            await axios.post('http://localhost:5000/users/refresh', {}, { withCredentials: true })
        } catch (error) {
            history.push('/')
        }
    }

    const createJobOffer = async () => {
        try {
            const now = new Date().getDay()
            const _startDate = new Date(start_date).getDay()
            let active = false

            if (now === _startDate) active = true

            const data = {
                position_name: job_category,
                title: offer_title,
                start_date,
                end_date,
                experience_lvl: experience_level,
                city,
                street,
                remote_work,
                contract_type,
                min_salary,
                max_salary,
                currency,
                education,
                online_interview: recruitmentOnline,
                description,
                active
            }
            axios.post('http://localhost:5000/job-offer', data, { withCredentials: true }).then((response) => {
                console.log(response)
                createTechnologies(response.data.id)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const createTechnologies = async (id) => {
        for (let i = 0; i < technologies.length; i++) {
            const tech = technologies[i]
            try {
                await axios.post(`http://localhost:5000/technologies/${id}`, {
                    name: tech.technology,
                    experience: tech.experience,
                    main_technology: tech.primaryTechnology
                }, { withCredentials: true })
            } catch (error) {
                console.log(error)
            }
        }
    }

    const createOffer = async () => {
        await refreshToken()
        await createJobOffer()
    }

    return (
        <div className='employeer--save--container'>
            <button className="employeer--basic-info--removeoffice employeer--save--update" onClick={() => createOffer()}>Publish</button>
            <button className='employeer--basic-info--removeoffice employeer--save--preview'>Preview</button>
        </div>
    )
}

export default EmployeerJobOfferSave