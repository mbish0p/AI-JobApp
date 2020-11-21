import React, { useState } from 'react'
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios'
import Doc from '../img/doc.svg'
import Docx from '../img/docx.svg'
import DefaultDoc from '../img/google-docs.svg'
import Pdf from '../img/pdf.svg'

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
    const [fileList, setFileList] = useState([]);
    const [cvExtension, setCvExtension] = useState('');

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
    const onChange = ({ fileList: newFileList }, info) => {
        console.log('newFileList:', newFileList)
        setFileList(newFileList);
    };

    const handlePreview = (file) => {
        console.log(file)
    }

    const customRequest = async ({ onSuccess, onError, file, data }) => {
        console.log(data)
        const fmData = new FormData()
        fmData.append("file", file);
        fmData.append('name', file.name)
        try {
            const response = await axios.post('http://localhost:5000/files', fmData, {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`
                }, withCredentials: true
            })
            onSuccess(response.data);
            console.log(response)
        } catch (error) {
            onError({ error });
            console.log(error)
        }
    }

    const onPreview = async file => {
        let src = file.url;
        console.log('file', file)
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
    };

    const CVFile = () => {
        const file = fileList[fileList.length - 1]
        if (file) {
            const fileName = file.name
            const index = fileName.indexOf('.')
            const fileExtension = fileName.slice(index + 1)
            if (fileExtension === 'pdf') {
                return (
                    <div>
                        <div>
                            <img src={Pdf} alt='PDF' className='user-profile--CV--image' />
                        </div>
                        <p>{fileName}</p>
                    </div>
                )
            }
            else if (fileExtension === 'doc') {
                return (
                    <div>
                        <div>
                            <img src={Doc} alt='DOC' className='user-profile--CV--image' />
                        </div>
                        <p>{fileName}</p>
                    </div>
                )
            }
            else if (fileExtension === 'docx') {
                console.log(fileExtension)

                return (
                    <div>
                        <div>
                            <img src={Docx} alt='DOCX' className='user-profile--CV--image' />
                        </div>
                        <p>{fileName}</p>
                    </div>
                )
            }
            else {
                console.log(fileExtension)
                return (
                    <div>
                        <div>
                            <img src={DefaultDoc} alt='DEFAULT' className='user-profile--CV--image' />
                        </div>
                        <p>{fileName}</p>
                    </div>
                )
            }
        } else {
            return (
                <p></p>
            )
        }
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
            <p>Attach CV</p>
            <Upload
                fileList={fileList}
                onChange={onChange}
                beforeUpload={() => true}
                onPreview={handlePreview}
                customRequest={customRequest}
            >
                <Button ><UploadOutlined /> Click to Upload</Button>
            </Upload>
            <CVFile />
        </div>
    )
}

export default UserProfileDashboard