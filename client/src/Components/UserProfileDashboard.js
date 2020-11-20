import React, { useState } from 'react'


const UserProfileDashboard = () => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [buttonList, setButtonList] = useState([{
        name: "Frontend",
        active: false
    }, {
        name: "Backend",
        active: false
    }, {
        name: "Fullstack",
        active: false
    }, {
        name: "Architect",
        active: false
    }, {
        name: "Mobile",
        active: false
    }, {
        name: "Embedded",
        active: false
    }, {
        name: "Tech Leader",
        active: false
    }, {
        name: "Tester",
        active: false
    }, {
        name: "QA",
        active: false
    }, {
        name: "Project Manager",
        active: false
    }, {
        name: "Scrum Master",
        active: false
    }, {
        name: "Analyst",
        active: false
    }, {
        name: "Support",
        active: false
    }, {
        name: "Security",
        active: false
    }, {
        name: "Administrator",
        active: false
    }, {
        name: "DevOps",
        active: false
    }, {
        name: "UX/UI Designer",
        active: false
    }])

    const [experienceLevel, setExperienceLevel] = useState([
        {
            name: "Junior",
            active: false
        }, {
            name: "Mid",
            active: false
        }, {
            name: "Senior",
            active: false
        }
    ])

    const [educationList, setEducationList] = useState([
        {
            name: "Other",
            active: false
        }, {
            name: "High School Diploma",
            active: false
        }, {
            name: "Associate's Degree",
            active: false
        }, {
            name: "Bachelor's Degree",
            active: false
        }, {
            name: "Master's Degree",
            active: false
        }, {
            name: "Doctoral Degree",
            active: false
        }, {
            name: "Professional Degree",
            active: false
        }
    ])

    const [contractList, setContractList] = useState([
        {
            name: "Any contract",
            active: false
        }, {
            name: "B2B",
            active: false
        }, {
            name: "Contract of Employment",
            active: false
        }
    ])

    const [activePosition, setActivePosition] = useState({ name: '', index: undefined })
    const [activeExperience, setActiveExperience] = useState({ name: '', index: undefined })
    const [activeEducation, setAactiveEducation] = useState({ name: '', index: undefined })
    const [aciveContract, setAciveContract] = useState({ name: '', index: undefined })
    const [minSalary, setMinSalary] = useState('')
    const [prefferedSalary, setPrefferedSalary] = useState('')
    const [city, setCity] = useState('')
    const [remoteWorking, setRemoteWorking] = useState('')


    const handleNameInput = (event) => {
        setName(event.target.value)
    }

    const handleSurnameInput = (event) => {
        setSurname(event.target.value)
    }

    const handleEmailInput = (event) => {
        setEmail(event.target.value)
    }

    const handlePhoneInput = (event) => {
        setPhoneNumber(event.target.value)
    }

    const handleMinSalary = (event) => {
        setMinSalary(event.target.value)
    }

    const handlePrefferedSalary = (event) => {
        setPrefferedSalary(event.target.value)
    }

    const handleCity = (event) => {
        setCity(event.target.value)
    }

    const handleRemoteWorking = (event) => {
        setRemoteWorking(event.target.value)
    }

    const handlePositionCategory = (event) => {
        const lastActive = activePosition.index
        const _buttonList = [...buttonList]
        const newActive = _buttonList[event.target.value]
        if (lastActive !== undefined) {
            _buttonList[lastActive].active = false
            _buttonList[event.target.value].active = true
        } else {
            _buttonList[event.target.value].active = true
        }
        setButtonList(_buttonList)
        setActivePosition({
            name: newActive.name,
            index: event.target.value
        })
    }

    const handleExperience = (event) => {
        const lastActive = activeExperience.index
        const _buttonList = [...experienceLevel]
        const newActive = _buttonList[event.target.value]
        if (lastActive !== undefined) {
            _buttonList[lastActive].active = false
            _buttonList[event.target.value].active = true
        } else {
            _buttonList[event.target.value].active = true
        }
        setExperienceLevel(_buttonList)
        setActiveExperience({
            name: newActive.name,
            index: event.target.value
        })
    }

    const handleEducation = (event) => {
        const lastActive = aciveContract.index
        const _buttonList = [...educationList]
        const newActive = _buttonList[event.target.value]
        if (lastActive !== undefined) {
            _buttonList[lastActive].active = false
            _buttonList[event.target.value].active = true
        } else {
            _buttonList[event.target.value].active = true
        }
        setEducationList(_buttonList)
        setAactiveEducation({
            name: newActive.name,
            index: event.target.value
        })
    }

    const handleContractType = (event) => {
        const lastActive = activeEducation.index
        const _buttonList = [...contractList]
        const newActive = _buttonList[event.target.value]
        if (lastActive !== undefined) {
            _buttonList[lastActive].active = false
            _buttonList[event.target.value].active = true
        } else {
            _buttonList[event.target.value].active = true
        }
        setContractList(_buttonList)
        setAciveContract({
            name: newActive.name,
            index: event.target.value
        })
    }

    return (
        <div className='main_dashboard--container'>
            <div>
                <h2>User information</h2>
                <p>Name</p>
                <input value={name} onChange={(event) => handleNameInput(event)} />
                <p>Surname</p>
                <input value={surname} onChange={(event) => handleSurnameInput(event)} />
                <p>E-mail</p>
                <input value={email} onChange={(event) => handleEmailInput(event)} />
                <p>Phone number</p>
                <input value={phoneNumber} onChange={(event) => handlePhoneInput(event)} />
                <p>Position category</p>
                <div>
                    {
                        buttonList.map((button, index) => {
                            return (
                                <button value={index} key={index} onClick={(event) => handlePositionCategory(event)}>{button.name}</button>
                            )
                        })
                    }
                </div>
                <p>Experience level</p>
                <div>
                    {
                        experienceLevel.map((exp, index) => {
                            return (
                                <button value={index} key={index} onClick={(event) => handleExperience(event)}>{exp.name}</button>
                            )
                        })
                    }
                </div>
                <p>Minimum salary</p>
                <input value={minSalary} onChange={(event) => handleMinSalary(event)} />
                <p>Prefferd salary</p>
                <input value={prefferedSalary} onChange={(event) => handlePrefferedSalary(event)} />

                <p>Education</p>
                {
                    educationList.map((education, index) => {
                        return (
                            <button value={index} key={index} onClick={(event) => handleEducation(event)}>{education.name}</button>
                        )
                    })
                }

                <p>City</p>
                <input value={city} onChange={(event) => handleCity(event)} />
                <div>
                    <input type='checkbox' value={remoteWorking} onChange={(event) => handleRemoteWorking(event)} />
                    <p>Only looking for remote job</p>
                </div>
                <p>Contract type</p>
                {
                    contractList.map((contract, index) => {
                        return (
                            <button value={index} key={index} onClick={(event) => handleContractType(event)}>{contract.name}</button>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default UserProfileDashboard