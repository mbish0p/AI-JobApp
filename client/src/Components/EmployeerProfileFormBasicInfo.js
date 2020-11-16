import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
    saveEmployeerOffices,
    saveEmployeesNumber,
    saveCompanyName,
    saveCompanyWWW,
    saveEmployeerTechs,
    saveEmployeerFetchedTechs,
    saveEmployeerFetchedOffices
} from '../_actions/userEmployeer'

import '../styles/EmployeerProfile.css'

const EmployeerProfileFormBasicInfo = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [technology, setTechnology] = useState('')
    const [technologies, setTechnologies] = useState([])
    const [companyName, setCompanyName] = useState('')
    const [companyWWW, setCompanyWWW] = useState('')
    const [employeesNumber, setEmployeesNumber] = useState('')
    const [offices, setOffices] = useState([{ officeName: '', city: '', street: '' }])
    const [fetchedTechnologies, setFetchedTechnologies] = []
    const [fetchedOffices, setFetchedOfficess] = []

    const fetchEmployeerProfile = async () => {
        try {
            const response = await axios.get('http://localhost:5000/employeer', { withCredentials: true })
            console.log(response)
            fetchEmployeerData(response.data.employeer)
            fetchTechnologies(response.data.employeerTechnologies)
            fetchOffices(response.data.employeerOffice)
        } catch (error) {
            console.log(error.response)
            if (error.response.data.error.message === 'jwt expired')
                try {
                    const result = await axios('http://localhost:5000/users/refresh', {
                        withCredentials: true,
                        method: 'POST'
                    })
                    if (result.status === 201) {
                        const response = await axios.get('http://localhost:5000/employeer', { withCredentials: true })
                        console.log(response)
                        fetchEmployeerData(response.data.employeer)
                        fetchTechnologies(response.data.employeerTechnologies)
                        fetchOffices(response.data.employeerOffice)
                    }
                } catch (error) {
                    console.log(error)
                    console.log(error.response)
                    if (error.response && error.response.status === 400) {
                        history.push('/')
                    }
                }
        }
    }

    useEffect(() => {
        fetchEmployeerProfile()
    }, [])

    const fetchEmployeerData = (employeerData) => {
        console.log(employeerData)
        if (employeerData.company_name) {
            setCompanyName(employeerData.company_name)
            dispatch(saveCompanyName({ company_name: employeerData.company_name }))
        }
        if (employeerData.www) {
            setCompanyWWW(employeerData.www)
            dispatch(saveCompanyWWW({ www: employeerData.www }))
        }
        if (employeerData.employee_number) {
            setEmployeesNumber(employeerData.employee_number)
            dispatch(saveEmployeesNumber({ employee_number: employeerData.employee_number }))
        }
    }

    const fetchTechnologies = (fetchTechs) => {
        const techList = [...technologies]
        fetchTechs.forEach((tech) => {
            const techName = tech.name
            techList.push({ technology: techName })
        })
        setTechnologies(techList)
        dispatch(saveEmployeerFetchedTechs(techList))
        dispatch(saveEmployeerTechs(techList))
    }

    const fetchOffices = (fetchAddresses) => {
        const officeList = [...offices]
        fetchAddresses.forEach((office) => {
            const index = officeList.length - 1
            officeList[index].officeName = office.office_name
            officeList[index].city = office.city
            officeList[index].street = office.street
            officeList.push({ officeName: '', city: '', street: '' })
        })

        setOffices(officeList)
        dispatch(saveEmployeerFetchedOffices(officeList))
        dispatch(saveEmployeerOffices(officeList))
    }

    const addTech = (e) => {
        e.preventDefault()
        const technologyList = [...technologies]
        if (technology) {
            const _technology = technology
            technologyList.push({ technology: _technology })
            setTechnologies([...technologyList])
            dispatch(saveEmployeerTechs([...technologyList]))
            setTechnology('')
        }
    }

    const deleteTech = (event, _tech) => {
        event.preventDefault()
        const techName = _tech.technology
        console.log(_tech)
        const tech = [...technologies]

        const filtredTechs = tech.filter((technology) => {
            return technology.technology !== techName
        })

        setTechnologies(filtredTechs)
        dispatch(saveEmployeerTechs(filtredTechs))
    }

    const handleNameChange = (event, index) => {
        const { value } = event.target
        const officeList = [...offices]
        officeList[index].officeName = value
        setOffices(officeList)
        dispatch(saveEmployeerOffices(officeList))
    }

    const handleCityChange = (event, index) => {
        const { value } = event.target
        const officeList = [...offices]
        officeList[index].city = value
        setOffices(officeList)
        dispatch(saveEmployeerOffices(officeList))
    }

    const handleStreetChange = (event, index) => {
        const { value } = event.target
        const officeList = [...offices]
        officeList[index].street = value
        setOffices(officeList)
        dispatch(saveEmployeerOffices(officeList))
    }

    const addOffice = (event) => {
        event.preventDefault()

        const officeList = [...offices]
        officeList.push({ officeName: '', city: '', street: '' })
        setOffices(officeList)
        dispatch(saveEmployeerOffices(officeList))
    }

    const handleCompanyName = (e) => {
        setCompanyName(e.target.value)
        dispatch(saveCompanyName({ company_name: e.target.value }))
    }

    const handleCompanyWW = (e) => {
        setCompanyWWW(e.target.value)
        dispatch(saveCompanyWWW({ www: e.target.value }))
    }

    const handleEmployessNumber = (e) => {
        setEmployeesNumber(e.target.value)
        dispatch(saveEmployeesNumber({ employee_number: e.target.value }))
    }

    const removeOffice = (event, index) => {
        event.preventDefault()

        console.log(index)
        const officeList = [...offices]
        officeList.splice(index, 1)
        setOffices(officeList)
        dispatch(saveEmployeerOffices(officeList))
    }
    return (
        <div className='employeer--basic-info--container'>
            <h2 className='employeer--basic-info--title'>Basic information</h2>
            <p className='employeer--basic-info--label'>Company name</p>
            <input className='employeer--basic-info--input' value={companyName} onChange={(e) => handleCompanyName(e)} />
            <p className='employeer--basic-info--label'>Company page address www</p>
            <input className='employeer--basic-info--input' value={companyWWW} onChange={(e) => handleCompanyWW(e)} />
            <p className='employeer--basic-info--label' >Employees number</p>
            <input className='employeer--basic-info--input' value={employeesNumber} onChange={(e) => handleEmployessNumber(e)} />
            <p className='employeer--basic-info--label' >Company technologies</p>
            <div>
                <input className='employeer--basic-info--tech-input' value={technology} onChange={(e) => { setTechnology(e.target.value) }}></input>
                <button className='employeer--basic-info--tech-add-button' onClick={(e) => addTech(e)}>Add</button>
            </div>
            <div className='employeer--basic-info--tech-list'>
                {
                    technologies.map((tech, index) => {
                        return <div key={index} className='employeer--basic-info--tech-container'>
                            <p className='employeer--basic-info--tech-name'>{tech.technology}</p>
                            <button className='employeer--basic-info--tech-remove-button' onClick={(event) => deleteTech(event, tech)}>X</button>
                        </div>
                    })
                }
            </div>
            <p className='employeer--basic-info--label'>Office address</p>
            {
                (offices.length !== 0) ?
                    offices.map((office, index) => {
                        return <div key={index} className='employeer--basic-info--office-container'>
                            <div className='employeer--basic-info--office-top'>
                                <input placeholder='Office name'
                                    className='employeer--basic-info--on-input'
                                    value={offices[index].officeName}
                                    onChange={(event) => handleNameChange(event, index)} />
                                <input placeholder='City'
                                    className='employeer--basic-info--city-input'
                                    value={offices[index].city}
                                    onChange={(event) => handleCityChange(event, index)} />
                                <button className='employeer--basic-info--removeoffice' onClick={(event) => removeOffice(event, index)}>Delete</button>
                            </div>
                            <div className='employeer--basic-info--office-bottom'>
                                <input placeholder='Street'
                                    className='employeer--basic-info--street-input'
                                    value={offices[index].street}
                                    onChange={(event) => handleStreetChange(event, index)} />
                                <button className='employeer--basic-info--addoffice' onClick={(event) => addOffice(event)}>Add</button>
                            </div>
                        </div>
                    }) :
                    <button className='employeer--basic-info--addoffice employeer--basic-info--addoffice-alone' onClick={(event) => addOffice(event)}>Add</button>
            }
        </div>
    )
}

export default EmployeerProfileFormBasicInfo