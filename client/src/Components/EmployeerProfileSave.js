import React from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
    saveEmployeerFetchedTechs,
    saveEmployeerFetchedOffices,
    saveDescriptionOne,
    saveDescriptionTwo,
    saveDescriptionThree
} from '../_actions/userEmployeer'

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

    const updateOffices = async () => {
        try {
            const officeList = employeerInfo.offices
            const fetchedOffices = employeerInfo.fetched_offices

            for (let i = 0; i < officeList.length; i++) {
                const office = officeList[i]
                let tmp = false

                if (office.id) {
                    fetchedOffices.forEach((fetchedOffice, index) => {
                        if (fetchedOffice.id === office.id) {
                            tmp = index
                        }
                    })
                    if (tmp !== false) {
                        console.log(tmp, fetchedOffices)
                        fetchedOffices.splice(tmp, 1)
                        console.log(fetchedOffices)
                    }
                } else {
                    try {
                        const response = await axios.post('http://localhost:5000/employeer-office', {
                            office_name: office.officeName,
                            city: office.city,
                            street: office.street
                        }, { withCredentials: true })
                        office.id = response.data.employeerOffice.id
                    } catch (error) {
                        console.log(error)
                    }
                }
            }

            console.log('After deleteing', fetchedOffices)

            for (let i = 0; i < fetchedOffices.length - 1; i++) {
                const fetchOffice = fetchedOffices[i]

                try {
                    await axios.delete(`http://localhost:5000/employeer-office/${fetchOffice.id}`, { withCredentials: true })
                    console.log(`deleted ${fetchOffice.id}`)
                } catch (error) {
                    console.log(error)
                }
            }
            dispatch(saveEmployeerFetchedOffices(officeList))
        } catch (error) {
            console.log(error)
        }
    }


    const updateDescriptions = async () => {
        const firstDesc = employeerInfo.textarea_one
        const secondDesc = employeerInfo.textarea_two
        const thirdDesc = employeerInfo.textarea_three

        if (!firstDesc.id && firstDesc.description) {
            try {
                const response = await axios.post('http://localhost:5000/employeer-description', {
                    name: 'What does the company do',
                    description: firstDesc.description
                }, { withCredentials: true })
                console.log(response)
                dispatch(saveDescriptionOne({
                    id: response.data.employeerDescription.id,
                    description: response.data.employeerDescription.description
                }))
            } catch (error) {
                console.log(error)
            }
        }
        if (!secondDesc.id && secondDesc.description) {
            try {
                const response = await axios.post('http://localhost:5000/employeer-description', {
                    name: 'What can you create with us',
                    description: secondDesc.description
                }, { withCredentials: true })
                console.log(response)
                dispatch(saveDescriptionTwo({
                    id: response.data.employeerDescription.id,
                    description: response.data.employeerDescription.description
                }))
            } catch (error) {
                console.log(error)
            }
        }
        if (!thirdDesc.id && thirdDesc.description) {
            try {
                const response = await axios.post('http://localhost:5000/employeer-description', {
                    name: 'Why you should work with us',
                    description: thirdDesc.description
                }, { withCredentials: true })
                console.log(response)
                dispatch(saveDescriptionThree({
                    id: response.data.employeerDescription.id,
                    description: response.data.employeerDescription.description
                }))
            } catch (error) {
                console.log(error)
            }
        }

        if (firstDesc.id) {
            try {
                const response = await axios.patch(`http://localhost:5000/employeer-description/${firstDesc.id}`, {
                    description: firstDesc.description
                }, { withCredentials: true })
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        if (secondDesc.id) {
            try {
                const response = await axios.patch(`http://localhost:5000/employeer-description/${secondDesc.id}`, {
                    description: secondDesc.description
                }, { withCredentials: true })
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        if (thirdDesc.id) {
            try {
                const response = await axios.patch(`http://localhost:5000/employeer-description/${thirdDesc.id}`, {
                    description: thirdDesc.description
                }, { withCredentials: true })
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }

    }

    const updateCompanyProfile = (e) => {
        refreshToken()
        updateEmployeerProfile()
        updateTechnologies()
        updateOffices()
        updateDescriptions()
    }

    return (
        <div className='employeer--save--container'>
            <button onClick={(e) => updateCompanyProfile(e)} className="employeer--basic-info--removeoffice employeer--save--update">Update</button>
            <button className='employeer--basic-info--removeoffice employeer--save--preview'>Preview</button>
        </div>
    )
}

export default EmployeerProfileSave