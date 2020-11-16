import React from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { saveEmployeerFetchedTechs } from '../_actions/userEmployeer'

const EmployeerProfileSave = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const employeerInfo = useSelector(state => state.userEmployeer)

    const refreshToken = async () => {
        try {
            await axios.post('http://localhost:5000/users/refresh', {}, { withCredentials: true })
        } catch (error) {
            history.push('/')
        }
    }

    const updateEmployeerProfile = async () => {
        try {
            const data = {
                company_name: employeerInfo.company_name,
                phone_number: employeerInfo.phone_number,
                www: employeerInfo.www,
                employee_number: parseInt(employeerInfo.employee_number)
            }
            await axios.patch('http://localhost:5000/employeer', data, { withCredentials: true })
        } catch (error) {
            console.log(error)
        }
    }

    const updateTechnologies = async () => {
        try {
            const techList = employeerInfo.technologies
            const fetchedTechList = employeerInfo.fetched_technologies

            for (let i = 0; i < techList.length; i++) {
                const tech = techList[i]
                let isContain = {
                    isContain: false,
                    index: undefined
                }

                fetchedTechList.forEach((fetchedTech, index) => {
                    if (fetchedTech.technology === tech.technology) {
                        isContain.isContain = true
                        isContain.index = index
                    }
                })

                if (isContain.isContain) {
                    fetchedTechList.splice(isContain.index, 1)
                } else {
                    try {
                        await axios.post('http://localhost:5000/employeer-technology', {
                            name: tech.technology,
                            main_technology: false
                        }, { withCredentials: true })
                        console.log(`created ${tech.technology}`)
                    } catch (error) {
                        console.log(error)
                    }
                }
            }

            for (let i = 0; i < fetchedTechList.length; i++) {
                const fetchedTech = fetchedTechList[i]
                try {
                    await axios.delete(`http://localhost:5000/employeer-technology/${fetchedTech.id}`, { withCredentials: true })
                    console.log(`deleted ${fetchedTech}`)
                } catch (error) {
                    console.log(error)
                }
            }

            dispatch(saveEmployeerFetchedTechs(techList))

        } catch (error) {
            console.log(error)
        }
    }

    const updateCompanyProfile = (e) => {
        refreshToken()
        updateEmployeerProfile()
        updateTechnologies()
    }

    return (
        <div className='employeer--save--container'>
            <button onClick={(e) => updateCompanyProfile(e)} className="employeer--basic-info--removeoffice employeer--save--update">Update</button>
            <button className='employeer--basic-info--removeoffice employeer--save--preview'>Preview</button>
        </div>
    )
}

export default EmployeerProfileSave