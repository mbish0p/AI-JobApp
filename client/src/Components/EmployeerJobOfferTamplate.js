import React, { useState } from 'react'
import Slider from '@material-ui/core/Slider';
import { DateRangePicker } from 'react-dates'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { useDispatch } from 'react-redux'
import {
    savePositionName,
    saveCityAddress,
    saveExperienceLvl,
    saveContractType,
    saveDescription,
    saveEndDate,
    saveJobCategory,
    saveMaxSalary,
    saveMinSalary,
    saveRecruitmentType,
    saveRemoteWork,
    saveStartDate,
    saveStreetAddress,
    saveCurrency,
    saveTechnologies_v2,
    saveEducation
} from '../_actions/jobOffer_action'
import EmployeerJobOfferSave from './EmployeerJobOfferSave'

import '../styles/EmployeerJobOffer.css'

const EmployeerJobOfferDashboard = () => {
    const dispatch = useDispatch()

    const [positionCategory, setPositionCategory] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [experienceLvl, setExperienceLvl] = useState('')
    const [address, setAddress] = useState('')
    const [sliderValue, setSliderValue] = useState(0)
    const [contractType, setContractType] = useState('')
    const [minSalary, setMinSalary] = useState('')
    const [maxSalary, setMaxSalary] = useState('')
    const [currency, setCurrency] = useState('PLN')
    const [onlineInterview, setOnlineInterview] = useState(false)
    const [description, setDescription] = useState('')
    const [technologiesList, setTechnologiesList] = useState([{ technology: '', experience: "> 6 months", primaryTechnology: false }])
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [focusedInput, setFocusedInput] = useState(null)
    const [education, setEducation] = useState('')

    const addLocation = () => {
        setAddress({ city: '', street: '' })
    }

    const removeLocation = () => {
        setAddress('')
    }

    const marks = [
        {
            value: 0,
            label: '0%',
        },
        {
            value: 100,
            label: '100%',
        },
    ];

    function valueText(value) {

        // be aware of errors, cousing warning
        setSliderValue(value)
        dispatch(saveRemoteWork(value))
        return `{value}%`
    }

    const handleTechnologyInput = (event, index, key) => {
        const { value } = event.target

        const list = [...technologiesList]
        key === 'technology' ? list[index]['technology'] = value : list[index]['experience'] = value
        setTechnologiesList(list)
        dispatch(saveTechnologies_v2([...list]))
    }

    const handlePrimaryTech = (index) => {
        const list = [...technologiesList]

        list[index]["primaryTechnology"] = !list[index]["primaryTechnology"]
        setTechnologiesList(list)
        dispatch(saveTechnologies_v2([...list]))
    }

    const handleRemoveClick = (event, index) => {
        event.preventDefault()
        const list = [...technologiesList];

        list.splice(index, 1);
        setTechnologiesList(list);
        dispatch(saveTechnologies_v2([...list]))
    };

    const handleAddClick = (event) => {
        event.preventDefault()
        setTechnologiesList([...technologiesList, { technology: '', experience: undefined, primaryTechnology: false }]);
    };

    const handlePositionCategory = (event) => {
        setPositionCategory(event.target.value)
        dispatch(saveJobCategory(event.target.value))
    }

    const handleJobTitle = (event) => {
        setJobTitle(event.target.value)
        dispatch(savePositionName(event.target.value))
    }

    const handleExperienceLvl = (event) => {
        setExperienceLvl(event.target.value)
        dispatch(saveExperienceLvl(event.target.value))
    }

    const handleCityAddress = (event) => {
        setAddress({
            city: event.target.value,
            street: address.street
        })
        dispatch(saveCityAddress(event.target.value))
    }

    const handleStreetAddress = (event) => {
        setAddress({
            city: address.city,
            street: event.target.value
        })
        dispatch(saveStreetAddress(event.target.value))
    }

    const handleContractType = (event) => {
        setContractType(event.target.value)
        dispatch(saveContractType(event.target.value))
    }

    const handleMinSalary = (event) => {
        setMinSalary(event.target.value)
        dispatch(saveMinSalary(event.target.value))
    }

    const handleMaxSalary = (event) => {
        setMaxSalary(event.target.value)
        dispatch(saveMaxSalary(event.target.value))
    }

    const handleCurrency = (event) => {
        setCurrency(event.target.value)
        dispatch(saveCurrency(event.target.value))
    }

    const handleOnlineInterview = () => {
        setOnlineInterview(!onlineInterview)
        dispatch(saveRecruitmentType(!onlineInterview))
    }

    const handleDates = (airbnbStartDate, airbnbEndDate) => {
        setStartDate(airbnbStartDate)
        setEndDate(airbnbEndDate)
        dispatch(saveStartDate(airbnbStartDate))
        dispatch(saveEndDate(airbnbEndDate))
    }

    const handleDescription = (event) => {
        setDescription(event.target.value)
        dispatch(saveDescription(event.target.value))
    }

    const handleEducation = (event) => {
        setEducation(event.target.value)
        dispatch(saveEducation(event.target.value))
    }


    return (
        <div className='main_dashboard--container'>
            <div className='employeer--job--container'>
                <h2 className='employeer--job--title'>Job category</h2>
                <p className='employeer--job--label'>Position category</p>
                <select className='employeer--job--select' value={positionCategory} onChange={(event) => handlePositionCategory(event)}>
                    <option value=""></option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Fullstack">Fullstack</option>
                    <option value="Architect">Architect</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Embedded">Embedded</option>
                    <option value="Tech Leader">Tech Leader</option>
                    <option value="Tester">Tester</option>
                    <option value="QA">QA</option>
                    <option value="Project Manger">Project Manger</option>
                    <option value="Scrum Master">Scrum Master</option>
                    <option value="Analyst">Analyst</option>
                    <option value="Support">Support</option>
                    <option value="Security">Security</option>
                    <option value="Administrator">Administrator</option>
                    <option value="DevOps">DevOps</option>
                    <option value="UX/UI Designer">UX/UI Designer</option>
                </select>
            </div>

            <div className='employeer--job--container'>
                <h2 className='employeer--job--title'>Basic information</h2>
                <p className='employeer--job--label'>Job offer title</p>
                <input className='employeer--job--input' value={jobTitle} onChange={(event) => handleJobTitle(event)} />
                <p className='employeer--job--label'>Experience level</p>
                <select className='employeer--job--select' value={experienceLvl} onChange={(event) => handleExperienceLvl(event)}>
                    <option value=""></option>
                    <option value="Junior">Junior</option>
                    <option value="Mid">Mid</option>
                    <option value="Senior">Senior</option>
                </select>

                <p className='employeer--job--label'>Work place</p>
                {
                    !address ? (
                        <button className='employeer--job--button' onClick={addLocation}>Add</button>
                    ) : <div>
                            <div className='employeer--job--city-container'>
                                <input className='employeer--job--input employeer--job--input-city' placeholder='  City' value={address.city} onChange={(event) => handleCityAddress(event)} />
                                <button className='employeer--job--button employeer--job--button-address--remove' onClick={removeLocation}>Remove</button>
                            </div>
                            <input className='employeer--job--input' placeholder='Street address' value={address.street} onChange={(event) => handleStreetAddress(event)} />
                        </div>

                }

                <p className='employeer--job--label'>Education</p>
                <select className='employeer--job--select' value={education} onChange={(event) => handleEducation(event)}>
                    <option value=""></option>
                    <option value="High School Diploma">High School Diploma</option>
                    <option value="Associate's Degree">Associate's Degree</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="Doctoral Degree">Doctoral Degree</option>
                    <option value="Professional Degree">Professional Degree</option>
                </select>

                <p className='employeer--job--label'>Remote work</p>
                <Slider
                    className='employeer--job--remote'
                    defaultValue={0}
                    getAriaValueText={valueText}
                    aria-labelledby="discrete-slider-custom"
                    step={10}
                    valueLabelDisplay="auto"
                    marks={marks}
                />

                <p className='employeer--job--label'>Contract type</p>
                <select className='employeer--job--select' value={contractType} onChange={(event) => handleContractType(event)}>
                    <option value=""></option>
                    <option value="Contract of employment">Contract of employment</option>
                    <option value="B2B contract">B2B contract</option>
                    <option value="Other contract">Other contract</option>
                </select>

                <p className='employeer--job--label'>Salary</p>
                <div className='employeer--job--salary-container'>
                    <input
                        className='employeer--job--input employeer--job--input-salary'
                        placeholder='From'
                        value={minSalary}
                        onChange={(event) => handleMinSalary(event)}
                    /> <p className='employeer--job--separator'>___</p><input
                        className='employeer--job--input employeer--job--input-salary'
                        placeholder='To'
                        value={maxSalary}
                        onChange={(event) => handleMaxSalary(event)}
                    />
                    <select className='employeer--job--select' value={currency} onChange={(event) => handleCurrency(event)}>
                        <option value="PLN">PLN</option>
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="CHF">CHF</option>
                    </select>
                </div>

                <div className='JO--chcekbox-container employeer--job--checkbox-container'>
                    <input className='JO--checkbox  employeer--job--checkbox' type='checkbox' value={onlineInterview} onClick={() => handleOnlineInterview()} />
                    <p className='JO--checkbox-title'>Online interview</p>
                </div>

                <p className='employeer--job--label'>Start and end date of recruitment</p>

                <DateRangePicker
                    startDate={startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => handleDates(startDate, endDate)} // PropTypes.func.isRequired,
                    focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
                />

            </div>

            <div className='employeer--job--container'>
                <h2 className='employeer--job--title'>Role description</h2>
                <p className='employeer--job--label'>Project description</p>
                <textarea
                    className='employeer--job--textarea'
                    value={description}
                    onChange={(event) => handleDescription(event)}
                />

                {technologiesList.map((technology, index) => {
                    return (
                        <div key={index} >
                            <div className='employeer--job--tech'>
                                <input placeholder='Technology' className='employeer--job--input employeer--job--tech--input' value={technology.technology} onChange={(event) => handleTechnologyInput(event, index, 'technology')} />
                                <select className='employeer--job--select' value={technology.experience} onChange={(event) => handleTechnologyInput(event, index, "experience")}>
                                    <option value="> 6 months">{'>'} 6 month</option>
                                    <option value="6 - 12 months">6 - 12 months</option>
                                    <option value="12 - 36 months">12 - 36 months</option>
                                    <option value="36 - 60 months">36 - 60 months</option>
                                    <option value="< 60 months">{'<'} 60 months</option>
                                </select>
                            </div>
                            <div className='employeer--job--checkbox  employeer--job--tech--conainer'>
                                <div className='JO--chcekbox-container'>
                                    <input className='JO--checkbox employeer--job--checkbox' type='checkbox' value={technology.primaryTechnology} onClick={() => { handlePrimaryTech(index) }} />
                                    <p className='JO--checkbox-title'>Main technology</p>
                                </div>
                                <button className='employeer--job--button employeer--job--tech--button' onClick={(event) => handleRemoveClick(event, index)}>X</button>
                            </div>
                        </div>
                    )
                })}
                <button className='employeer--job--button' onClick={handleAddClick}>+</button>
            </div>

            <EmployeerJobOfferSave />

        </div>
    )
}

export default EmployeerJobOfferDashboard