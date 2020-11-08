import React, { useState } from 'react'

import '../styles/EmployeerProfile.css'

const EmployeerProfileFormBasicInfo = () => {
    const [technology, setTechnology] = useState('')
    const [technologies, setTechnologies] = useState([])
    const [companyName, setCompanyName] = useState('')
    const [companyWWW, setCompanyWWW] = useState('')
    const [employeesNumber, setEmployeesNumber] = useState('')
    const [offices, setOffices] = useState([{ officeName: '', city: '', street: '' }])

    const addTech = (e) => {
        e.preventDefault()
        const technologyList = [...technologies]
        if (technology) {
            const _technology = technology
            technologyList.push({ technology: _technology })
            setTechnologies([...technologyList])
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
    }

    const handleNameChange = (event, index) => {
        const { value } = event.target
        const officeList = [...offices]
        officeList[index].officeName = value
        setOffices(officeList)
    }

    const handleCityChange = (event, index) => {
        const { value } = event.target
        const officeList = [...offices]
        officeList[index].city = value
        setOffices(officeList)
    }

    const handleStreetChange = (event, index) => {
        const { value } = event.target
        const officeList = [...offices]
        officeList[index].street = value
        setOffices(officeList)
    }

    const addOffice = (event) => {
        event.preventDefault()

        const officeList = [...offices]
        officeList.push({ officeName: '', city: '', street: '' })
        setOffices(officeList)
    }

    const removeOffice = (event, index) => {
        event.preventDefault()

        console.log(index)
        const officeList = [...offices]
        officeList.splice(index, 1)
        setOffices(officeList)
    }

    return (
        <div className='employeer--basic-info--container'>
            <h2 className='employeer--basic-info--title'>Basic information</h2>
            <p className='employeer--basic-info--label'>Company name</p>
            <input className='employeer--basic-info--input' value={companyName} onChange={(e) => { setCompanyName(e.target.value) }} />
            <p className='employeer--basic-info--label'>Company page address www</p>
            <input className='employeer--basic-info--input' value={companyWWW} onChange={(e) => { setCompanyWWW(e.target.value) }} />
            <p className='employeer--basic-info--label' >Employees number</p>
            <input className='employeer--basic-info--input' value={employeesNumber} onChange={(e) => { setEmployeesNumber(e.target.value) }} />
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
                offices.map((office, index) => {
                    return <div key={index} className='employeer--basic-info--office-container'>
                        <input placeholder='Office name'
                            className='employeer--basic-info--on-input'
                            value={offices[index].officeName}
                            onChange={(event) => handleNameChange(event, index)} />
                        <input placeholder='City'
                            className='employeer--basic-info--city-input'
                            value={offices[index].city}
                            onChange={(event) => handleCityChange(event, index)} />
                        <input placeholder='Street'
                            className='employeer--basic-info--street-input'
                            value={offices[index].street}
                            onChange={(event) => handleStreetChange(event, index)} />
                        <button className='employeer--basic-info--addoffice' onClick={(event) => addOffice(event)}>+</button>
                        <button className='employeer--basic-info--removeoffice' onClick={(event) => removeOffice(event, index)}>x</button>
                    </div>
                })
            }
        </div>
    )
}

export default EmployeerProfileFormBasicInfo