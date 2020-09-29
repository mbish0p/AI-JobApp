import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
    saveJobCategory,
    saveExperienceLvl,
    savePositionName,
    saveCityAddress,
    saveStreetAddress,
    saveRemoteWork,
    saveContractType,
    saveMinSalary,
    saveMaxSalary,
    saveDescription,
    saveRecruitmentType,
    saveTechnologies
} from '../../_actions/jobOffer_action'
import Slider from '@material-ui/core/Slider';
import './JobOfferForm.css'


const JobOfferForm = (props) => {
    const dispatch = useDispatch()
    console.log(props.content)

    const [selectValue, setSelectValue] = useState(undefined)
    const [positionName, setPositionName] = useState('')
    const [experienceLevel, setExperienceLevel] = useState(undefined)
    const [showAddressInput, setShowAddressInput] = useState(true)
    const [cityInput, setCityInput] = useState('')
    const [streetInput, setStreetInput] = useState('')
    const [sliderValue, setSliderValue] = useState(0)
    const [contractType, setContractType] = useState(undefined)
    const [minSalary, setMinSalary] = useState('')
    const [maxSalary, setMaxSalary] = useState('')
    const [descriptionValue, setDescriptionValue] = useState('')
    const [onlineRecruitment, setOnlineRecruitment] = useState(false)
    const [technologiesList, setTechnologiesList] = useState([{ technology: '', experience: undefined, primaryTechnology: false }])

    let text = ''
    let selectChildern = []

    switch (props.content.fields.Role.stringValue) {
        case '0':


            text = props.content.fields.text.stringValue
            selectChildern = props.content.fields.Select_input_childrens.listValue.values
            console.log(selectChildern)

            const submitSelectForm = (event) => {
                event.preventDefault()

                dispatch(saveJobCategory(selectValue))
                props.submitJobForm()
            }
            return (
                <div>
                    <p>{text}</p>
                    <form className='JO--form'>
                        <p className='JO--title'>Position name</p>
                        <select className='JO--select' value={selectValue} onChange={(event) => setSelectValue(event.target.value)}>
                            <option />
                            {selectChildern.map((child, index) => {
                                return <option key={index} value={child.stringValue.toLowerCase()}>{child.stringValue}</option>
                            })}
                        </select>
                    </form>
                    <button className='JO--submit-button' onClick={submitSelectForm}>Submit</button>
                </div>
            )
        case '1':

            text = props.content.fields.text.stringValue
            selectChildern = props.content.fields.Select_input_childrens.listValue.values

            const submitSecondForm = (event) => {
                event.preventDefault()

                dispatch(saveExperienceLvl(experienceLevel))
                dispatch(savePositionName(positionName))

                props.submitJobForm()
            }
            return (
                <div>
                    <p>{text}</p>
                    <form className='JO--form'>
                        <p className='JO--title'>Basic information</p>
                        <input placeholder='Position name' className='JO--input' value={positionName} onChange={(event) => setPositionName(event.target.value)} />
                        <select className='JO--select' value={experienceLevel} onChange={(event) => setExperienceLevel(event.target.value)}>
                            <option />
                            {selectChildern.map((child, index) => {
                                return <option key={index} value={child.stringValue.toLowerCase()}>{child.stringValue}</option>
                            })}
                        </select>
                    </form>
                    <button className='JO--submit-button' onClick={submitSecondForm}>Submit</button>
                </div>
            )
        case "2":

            text = props.content.fields.text.stringValue

            const submitAddressForm = (e) => {
                e.preventDefault()

                dispatch(saveStreetAddress(streetInput))
                dispatch(saveCityAddress(cityInput))

                props.submitJobForm()
            }

            return (
                showAddressInput ?
                    <div>
                        <p>{text}</p>
                        <form className='JO--form'>
                            <p className='JO--title'>Location</p>
                            <input placeholder='City' className='JO--input JO--input-city' value={cityInput} onChange={(e) => { setCityInput(e.target.value) }} />
                            <button className='JO--remove-button' onClick={() => { setShowAddressInput(false) }}>X</button>
                            <input placeholder='Street' className='JO--input' value={streetInput} onChange={(e) => { setStreetInput(e.target.value) }} />
                        </form>
                        <button className='JO--submit-button' onClick={submitAddressForm}>Submit</button>
                    </div> :
                    <div>
                        <p>{text}</p>
                        <form className='JO--form'>
                            <p className='JO--title'>Location</p>
                            <button className='JO--remove-button JO--add-button' onClick={() => { setShowAddressInput(true) }}>+</button>
                        </form>
                        <button className='JO--submit-button' onClick={submitAddressForm}>Submit</button>
                    </div>
            )
        case "3":

            text = props.content.fields.text.stringValue;
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

            function valuetext(value) {

                // be aware of errors, cousing warning
                setSliderValue(value)
                return `{value}%`
            }

            const submitSliderForm = (e) => {
                e.preventDefault()

                dispatch(saveRemoteWork(sliderValue))
                props.submitJobForm()
            }

            return (
                <div>
                    <p>{text}</p>
                    <form className='JO--form'>
                        <p className='JO--title' >Remote work</p>
                        <Slider
                            className='JO--slider'
                            defaultValue={0}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-custom"
                            step={10}
                            valueLabelDisplay="auto"
                            marks={marks}
                        />
                    </form>
                    <button className='JO--submit-button' onClick={submitSliderForm}>Submit</button>
                </div>
            )
        case "4":

            text = props.content.fields.text.stringValue;
            selectChildern = props.content.fields.Select_input_childrens.listValue.values

            const submitSalaryForm = (event) => {
                event.preventDefault()

                dispatch(saveContractType(contractType))
                dispatch(saveMinSalary(minSalary))
                dispatch(saveMaxSalary(maxSalary))

                props.submitJobForm()

            }

            return (
                <div>
                    <p>{text}</p>
                    <form className='JO--form'>
                        <p className='JO--title'>Contract type and salary</p>
                        <select className='JO--select' value={contractType} onChange={(event) => setContractType(event.target.value)}>
                            <option />
                            {selectChildern.map((child, index) => {
                                return <option key={index} value={child.stringValue.toLowerCase()}>{child.stringValue}</option>
                            })}
                        </select>

                        <input placeholder='Min salary' className='JO--input JO--salary-input' value={minSalary} onChange={(e) => { setMinSalary(e.target.value) }} /> -
                        <input placeholder='Max salary' className='JO--input JO--salary-input JO--max-salary-input' value={maxSalary} onChange={(e) => { setMaxSalary(e.target.value) }} />
                    </form>
                    <button className='JO--submit-button' onClick={submitSalaryForm}>Submit</button>
                </div>
            )
        case "5":

            text = props.content.fields.text.stringValue;

            const submitDescriptionForm = (event) => {
                event.preventDefault()

                dispatch(saveDescription(descriptionValue))
                dispatch(saveRecruitmentType(onlineRecruitment))

                props.submitJobForm()
            }

            return (
                <div>
                    <p>{text}</p>
                    <form className='JO--form'>
                        <p className='JO--title'>Description</p>
                        <textarea className='JO--textarea' placeholder='Description' value={descriptionValue} onChange={(event) => { setDescriptionValue(event.target.value) }} />
                        <div className='JO--chcekbox-container'>
                            <input className='JO--checkbox' type='checkbox' value={onlineRecruitment} onClick={() => { setOnlineRecruitment(!onlineRecruitment) }} />
                            <p className='JO--checkbox-title'>Online interview</p>
                        </div>
                    </form>
                    <button className='JO--submit-button' onClick={submitDescriptionForm}>Submit</button>
                </div>

            )

        case "6":

            text = props.content.fields.text.stringValue;
            selectChildern = props.content.fields.Select_input_childrens.listValue.values

            const handleTechnologyInput = (event, index, key) => {
                const { value } = event.target

                console.log(value)
                const list = [...technologiesList]
                key === 'technology' ? list[index]['technology'] = value : list[index]['experience'] = value
                setTechnologiesList(list)
            }

            const handlePrimaryTech = (index) => {
                const list = [...technologiesList]

                list[index]["primaryTechnology"] = !list[index]["primaryTechnology"]
                setTechnologiesList(list)
            }

            const handleRemoveClick = (event, index) => {
                event.preventDefault()
                const list = [...technologiesList];

                list.splice(index, 1);
                setTechnologiesList(list);
            };

            const handleAddClick = (event) => {
                event.preventDefault()
                setTechnologiesList([...technologiesList, { technology: '', experience: undefined, primaryTechnology: false }]);
            };

            const sumbitTechnologiesForm = (event) => {
                event.preventDefault()

                dispatch(saveTechnologies(technologiesList))
                props.submitJobForm()
            }

            return (
                <div>
                    <p>{text}</p>
                    <form className='JO--form'>
                        <p className='JO--title'>Tech skills</p>
                        {technologiesList.map((technology, index) => {
                            return (
                                <div key={index} >
                                    <input placeholder='Technology' className='JO--input JO--input--tech' value={technology.technology} onChange={(event) => handleTechnologyInput(event, index, 'technology')} />
                                    <select className='JO--select JO--select--tech' value={technology.experience} onChange={(event) => handleTechnologyInput(event, index, "experience")}>
                                        <option />
                                        {selectChildern.map((child, index) => {
                                            return <option key={index} value={child.stringValue.toLowerCase()}>{child.stringValue}</option>
                                        })}
                                    </select>
                                    <div className='JO--chcekbox-container'>
                                        <input className='JO--checkbox JO--checkbox--tech' type='checkbox' value={technology.primaryTechnology} onClick={() => { handlePrimaryTech(index) }} />
                                        <p className='JO--checkbox-title JO--checkbox-title--tech'>Main technology</p>
                                        <button className='JO--remove-button' onClick={(event) => handleRemoveClick(event, index)}>X</button>
                                    </div>
                                </div>
                            )
                        })}
                        <button className='JO--remove-button JO--add-button' onClick={handleAddClick}>+</button>

                    </form>
                    <button className='JO--submit-button' onClick={sumbitTechnologiesForm}>Submit</button>
                </div>
            )
        default:
            console.log('default')
    }
}

export default JobOfferForm