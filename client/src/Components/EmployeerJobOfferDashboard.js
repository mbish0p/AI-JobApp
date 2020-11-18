import React, { useState } from 'react'
import Slider from '@material-ui/core/Slider';

const EmployeerJobOfferDashboard = () => {
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
    const [technologiesList, setTechnologiesList] = useState([{ technology: '', experience: undefined, primaryTechnology: false }])

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
        return `{value}%`
    }

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

    return (
        <div className='main_dashboard--container'>
            <h2>Job category</h2>
            <p>Position category</p>
            <select value={positionCategory} onChange={(event) => setPositionCategory(event.target.value)}>
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

            <h2>Basic information</h2>
            <p>Job offer title</p>
            <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
            <p>Experience level</p>
            <select value={experienceLvl} onChange={(event) => setExperienceLvl(event.target.value)}>
                <option value=""></option>
                <option value="Junior">Junior</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
            </select>

            <p>Work place</p>
            {
                !address ? (
                    <button onClick={addLocation}>+</button>
                ) : <div>
                        <div>
                            <input placeholder='City' value={address.city} onChange={(e) => setAddress({
                                city: e.target.value,
                                street: address.street
                            })} />
                            <button onClick={removeLocation}>x</button>
                        </div>
                        <input placeholder='Street address' value={address.street} onChange={(e) => setAddress({
                            city: address.city,
                            street: e.target.value
                        })} />
                    </div>

            }

            <p>Remote work</p>
            <Slider
                defaultValue={0}
                getAriaValueText={valueText}
                aria-labelledby="discrete-slider-custom"
                step={10}
                valueLabelDisplay="auto"
                marks={marks}
            />

            <p>Contract type</p>
            <select value={contractType} onChange={(e) => setContractType(e.target.value)}>
                <option value=""></option>
                <option value="Contract of employment">Contract of employment</option>
                <option value="B2B contract">B2B contract</option>
                <option value="Other contract">Other contract</option>
            </select>

            <p>Salary</p>
            <div>
                <input
                    placeholder='From'
                    value={minSalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                /> - <input
                    placeholder='To'
                    value={maxSalary}
                    onChange={(e) => setMaxSalary(e.target.value)}
                />
                <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value="PLN">PLN</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                    <option value="CHF">CHF</option>
                </select>
            </div>

            <div className='JO--chcekbox-container'>
                <input className='JO--checkbox' type='checkbox' value={onlineInterview} onClick={() => { setOnlineInterview(!onlineInterview) }} />
                <p className='JO--checkbox-title'>Online interview</p>
            </div>

            <h2>Role description</h2>

            <p>Project description</p>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            {technologiesList.map((technology, index) => {
                return (
                    <div key={index} >
                        <input placeholder='Technology' className='' value={technology.technology} onChange={(event) => handleTechnologyInput(event, index, 'technology')} />
                        <select className='' value={technology.experience} onChange={(event) => handleTechnologyInput(event, index, "experience")}>
                            <option value="> 6 months">{'>'} 6 month</option>
                            <option value="6 - 12 months">6 - 12 months</option>
                            <option value="12 - 36 months">12 - 36 months</option>
                            <option value="36 - 60 months">36 - 60 months</option>
                            <option value="< 60 months">{'<'} 60 months</option>
                        </select>
                        <div className='JO--chcekbox-container'>
                            <input className='' type='checkbox' value={technology.primaryTechnology} onClick={() => { handlePrimaryTech(index) }} />
                            <p className=''>Main technology</p>
                            <button className='' onClick={(event) => handleRemoveClick(event, index)}>X</button>
                        </div>
                    </div>
                )
            })}
            <button className='' onClick={handleAddClick}>+</button>

        </div>
    )
}

export default EmployeerJobOfferDashboard