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
    saveMaxSalary
} from '../../_actions/jobOffer_action'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';



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
                    <form>
                        <p>Job kategory - please choose one role</p>
                        <select value={selectValue} onChange={(event) => setSelectValue(event.target.value)}>
                            <option />
                            {selectChildern.map((child, index) => {
                                return <option key={index} value={child.stringValue.toLowerCase()}>{child.stringValue}</option>
                            })}
                        </select>
                    </form>
                    <button onClick={submitSelectForm}>Submit</button>
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
                    <form>
                        <input value={positionName} onChange={(event) => setPositionName(event.target.value)} />
                        <select value={experienceLevel} onChange={(event) => setExperienceLevel(event.target.value)}>
                            <option />
                            {selectChildern.map((child, index) => {
                                return <option key={index} value={child.stringValue.toLowerCase()}>{child.stringValue}</option>
                            })}
                        </select>
                    </form>
                    <button onClick={submitSecondForm}>Submit</button>
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
                        <form>
                            <input value={cityInput} onChange={(e) => { setCityInput(e.target.value) }} />
                            <input value={streetInput} onChange={(e) => { setStreetInput(e.target.value) }} />
                            <button onClick={() => { setShowAddressInput(false) }}>X</button>
                        </form>
                        <button onClick={submitAddressForm}>Submit</button>
                    </div> :
                    <div>
                        <p>{text}</p>
                        <button onClick={() => { setShowAddressInput(true) }}>+</button>
                        <button onClick={submitAddressForm}>Submit</button>
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
                    <Typography id="discrete-slider-custom" gutterBottom>
                        Remote work
                    </Typography>
                    <Slider
                        defaultValue={0}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-custom"
                        step={10}
                        valueLabelDisplay="auto"
                        marks={marks}
                    />
                    <button onClick={submitSliderForm}>Submit</button>
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
                    <form>
                        <select value={contractType} onChange={(event) => setContractType(event.target.value)}>
                            <option />
                            {selectChildern.map((child, index) => {
                                return <option key={index} value={child.stringValue.toLowerCase()}>{child.stringValue}</option>
                            })}
                        </select>

                        <input value={minSalary} onChange={(e) => { setMinSalary(e.target.value) }} /> -
                        <input value={maxSalary} onChange={(e) => { setMaxSalary(e.target.value) }} />
                    </form>
                    <button onClick={submitSalaryForm}>Submit</button>
                </div>
            )
        case "5":

            text = props.content.fields.text.stringValue;
            return (
                <div>
                    <p>{text}</p>
                </div>

            )
        default:
            console.log('default')
    }
}

export default JobOfferForm