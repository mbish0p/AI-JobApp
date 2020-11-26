import React, { useState } from 'react'
import Location from '../img/white-placeholder.svg'
import Technologies from '../img/project-management.svg'
import Position from '../img/businessman.svg'
import Java from '../img/java.svg'
import JavaScript from '../img/js-format.svg'
import Cpp from '../img/cpp.svg'
import CSharp from '../img/hashtag.svg'
import Python from '../img/python.svg'
import HTML from '../img/html5.svg'
import CSS from '../img/css-3.svg'
import Star from '../img/star.svg'

import '../styles/JobOffersPage.css'

const MainJobOfferHeader = () => {
    const [location, setLocation] = useState('')
    const [techName, setTechName] = useState('')

    const handleLocation = (event) => {
        setLocation(event.target.value)
    }
    const handleTechName = (event) => {
        setTechName(event.target.value)
    }

    const [positionList, setPositionList] = useState([{
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

    const [technologiesList, setTechnologiesList] = useState([
        {
            name: "Java",
            active: false,
            img: Java

        }, {
            name: "JavaScript",
            active: false,
            img: JavaScript

        }, {
            name: "C++",
            active: false,
            img: Cpp
        }, {
            name: "C#",
            active: false,
            img: CSharp

        }, {
            name: "Python",
            active: false,
            img: Python

        }, {
            name: "HTML",
            active: false,
            img: HTML
        }, {
            name: "CSS",
            active: false,
            img: CSS
        }
    ])

    const [activePositions, setActivePositions] = useState([])
    const [activeTechnologies, setActiveTechnologies] = useState([])
    const [activeExperiences, setActiveExperiences] = useState([])

    const handlePositionCategory = (event) => {
        console.log(event.target)
        const alreadyActive = [...activePositions]
        const buttons = [...positionList]
        const index = event.target.value
        if (buttons[index].active) {
            const newActive = alreadyActive.filter((position) => {
                if (position.name !== buttons[index].name) {
                    return true
                }
                else return false
            })
            buttons[index].active = false
            setPositionList(buttons)
            setActivePositions(newActive)
        } else {
            const position = buttons[index]
            buttons[index].active = true
            alreadyActive.push(position)
            setActivePositions(alreadyActive)
            setPositionList(buttons)
        }
    }

    const handleTechs = (event, id) => {
        const alreadyActive = [...activeTechnologies]
        const buttons = [...technologiesList]
        const index = id
        if (buttons[index].active) {
            const newActive = alreadyActive.filter((position) => {
                if (position.name !== buttons[index].name) {
                    return true
                }
                else return false
            })
            buttons[index].active = false
            setTechnologiesList(buttons)
            setActiveTechnologies(newActive)
        } else {
            const position = buttons[index]
            buttons[index].active = true
            alreadyActive.push(position)
            setActiveTechnologies(alreadyActive)
            setTechnologiesList(buttons)
        }
    }

    const handleExperience = (event) => {
        const alreadyActive = [...activeExperiences]
        const buttons = [...experienceLevel]
        const index = event.target.value
        if (buttons[index].active) {
            const newActive = alreadyActive.filter((position) => {
                if (position.name !== buttons[index].name) {
                    return true
                }
                else return false
            })
            buttons[index].active = false
            setExperienceLevel(buttons)
            setActiveExperiences(newActive)
        } else {
            const position = buttons[index]
            buttons[index].active = true
            alreadyActive.push(position)
            setActiveExperiences(alreadyActive)
            setExperienceLevel(buttons)
        }
    }

    return (
        <div className='main-job-offer-header--container'>
            <div>
                <img src={Location} className='main-job-offer-header--label-iamge' alt='location_image' />
                <input value={location} onChange={(event) => handleLocation(event)} />
            </div>
            <div>
                <img src={Position} className='main-job-offer-header--label-iamge' alt='position_image' />
                {
                    positionList.map((button, index) => {
                        return (
                            <button className={positionList[index].active ? "user-profile--select-button-active" : "user-profile--select-button"} value={index} key={index} onClick={(event) => handlePositionCategory(event)}>{button.name}</button>
                        )
                    })
                }
            </div>
            <div>
                <img src={Technologies} className='main-job-offer-header--label-iamge' alt='tech_image' />
                {
                    technologiesList.map((button, index) => {
                        return (
                            <button className={technologiesList[index].active ? "user-profile--select-button-active" : "user-profile--select-button"}
                                value={index}
                                key={index}
                                onClick={(event) => handleTechs(event, index)}>
                                <img src={button.img} className='main-job-offer-header--tech-iamge' alt='tech-item_image' />
                                <p value={index}>{button.name}</p>
                            </button>
                        )
                    })
                }
                <input value={techName} onChange={(event) => handleTechName(event)} />
            </div>
            <div>
                <img src={Star} className='main-job-offer-header--label-iamge' alt='star_image' />
                {
                    experienceLevel.map((button, index) => {
                        return (
                            <button className={experienceLevel[index].active ? "user-profile--select-button-active" : "user-profile--select-button"} value={index} key={index} onClick={(event) => handleExperience(event)}>{button.name}</button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MainJobOfferHeader