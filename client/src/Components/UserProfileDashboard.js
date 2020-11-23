import React, { useState, useEffect } from 'react'
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios'
import Doc from '../img/doc.svg'
import Docx from '../img/docx.svg'
import DefaultDoc from '../img/google-docs.svg'
import Pdf from '../img/pdf.svg'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { saveUserData } from '../_actions/userEmployee'
import { v4 as uuidv4 } from 'uuid';

const UserProfileDashboard = () => {
    const history = useHistory()
    const userInfo = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(userInfo)
        setName(userInfo.name || '')
        setSurname(userInfo.surname || '')
    }, [userInfo])

    useEffect(() => {
        fetchEmployeeData()
    }, [])

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
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
    const [activeContract, setAciveContract] = useState({ name: '', index: undefined })
    const [minSalary, setMinSalary] = useState('')
    const [prefferedSalary, setPrefferedSalary] = useState('')
    const [city, setCity] = useState('')
    const [remoteWorking, setRemoteWorking] = useState('')
    const [fileList, setFileList] = useState([]);

    const handleNameInput = (event) => {
        setName(event.target.value)
    }

    const handleSurnameInput = (event) => {
        setSurname(event.target.value)
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
        const lastActive = activeEducation.index
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
        const lastActive = activeContract.index
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
        fmData.append('name', "CV")
        try {
            const response = await axios.post('http://localhost:5000/files', fmData, {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`
                }, withCredentials: true
            })
            message.success(`${file.name} file uploaded successfully`);
            onSuccess(response.data);
            console.log(response)
        } catch (error) {
            onError({ error });
            console.log(error)
            if (error.response && error.response.data && error.response.data.error && error.response.data.error.message === 'jwt expired') {
                try {
                    const jwtResult = await axios('http://localhost:5000/users/refresh', {
                        withCredentials: true,
                        method: 'POST'
                    })
                    console.log(jwtResult)
                    if (jwtResult.status === 201) {
                        const response = await axios.post('http://localhost:5000/files', fmData, {
                            headers: {
                                'Content-Type': `multipart/form-data; boundary=${data._boundary}`
                            }, withCredentials: true
                        })
                        onSuccess(response.data);
                        message.success(`${file.name} file uploaded successfully`);
                        console.log(response)
                    }
                    message.error(`${file.name} file upload failed.`);
                } catch (error) {
                    console.log(error)
                    if (error.response.status === 400) {
                        history.push('/')
                    }
                }
            } else {
                message.error(`${file.name} file upload failed.`);
            }

        }

    }

    const findAndSetActive = (list, key) => {
        list.forEach((listItem, index) => {
            if (listItem.name === key) {
                listItem.active = true
                return index
            }
        })
    }

    const doNothing = () => { }

    const fetchEmployeeData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/employee', { withCredentials: true })
            console.log(response)
            const files = response.data.files
            const { phone_number, city, contract_type, preffered_position, experience_level, min_salary, preffered_salary, education, only_remote } = response.data.employee
            setPhoneNumber(phone_number || '')
            setMinSalary(min_salary || '')
            setPrefferedSalary(preffered_salary || '')
            setCity(city || '')
            setRemoteWorking(only_remote || '')
            contract_type ? (
                setAciveContract({ name: contract_type, index: findAndSetActive(contractList, contract_type) })
            ) : doNothing()
            preffered_position ? (
                setActivePosition({ name: preffered_position, index: findAndSetActive(buttonList, preffered_position) })
            ) : doNothing()
            experience_level ? (
                setActiveExperience({ name: experience_level, index: findAndSetActive(experienceLevel, experience_level) })
            ) : doNothing()
            education ? (
                setAactiveEducation({ name: education, index: findAndSetActive(educationList, education) })
            ) : doNothing()
            console.log(files)
            const updatedFileList = [...fileList]
            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                console.log('asdasda', file)
                if (file.name === "CV") {
                    const firstIndex = file.file.indexOf('_')
                    const secondIndex = file.file.indexOf('?sv=')
                    const fileName = file.file.slice(firstIndex + 1, secondIndex)
                    file.name = fileName || file.name
                    file.uid = uuidv4()
                    updatedFileList.push(file)
                }
            }
            console.log(updatedFileList)
            setFileList(updatedFileList)
        } catch (error) {
            console.log(error)
        }
    }

    const refreshToken = () => {
        try {
            axios.post('http://localhost:5000/users/refresh', {}, { withCredentials: true })
        } catch (error) {
            console.log(error)
            history.push('/login')
        }
    }

    const updateUserInformation = () => {
        try {
            const data = {
                name,
                surname,
            }
            const response = axios.patch('http://localhost:5000/users', data, { withCredentials: true })
        } catch (error) {
            console.log(error)
        }
    }

    const updateEmployeeInformation = async () => {
        try {
            const data = {
                phone_number: phoneNumber,
                city,
                contract_type: activeContract.name,
                preffered_position: activePosition.name,
                experience_level: activeExperience.name,
                min_salary: minSalary,
                preffered_salary: prefferedSalary,
                education: activeEducation.name,
                only_remote: remoteWorking
            }

            await axios.post('http://localhost:5000/employee', data, { withCredentials: true })
        } catch (error) {
            console.log(error)
        }
    }

    const saveUserData = (event) => {
        refreshToken()
        updateUserInformation()
        updateEmployeeInformation()
    }

    const CVFile = () => {
        const file = fileList[fileList.length - 1]
        if (file) {
            const fileName = file.name
            const index = fileName.indexOf('.')
            const fileExtension = fileName.slice(index + 1)
            if (fileExtension === 'pdf') {
                return (
                    <div className='user-profile--CV--container'>
                        <div className='user-profile--CV--image-container'>
                            <img src={Pdf} alt='PDF' className='user-profile--CV--image' />
                        </div>
                        <p className='user-profile--CV--label'>{fileName}</p>
                    </div>
                )
            }
            else if (fileExtension === 'doc') {
                return (
                    <div className='user-profile--CV--container'>
                        <div className='user-profile--CV--image-container'>
                            <img src={Doc} alt='DOC' className='user-profile--CV--image' />
                        </div>
                        <p className='user-profile--CV--label'>{fileName}</p>
                    </div>
                )
            }
            else if (fileExtension === 'docx') {
                console.log(fileExtension)

                return (
                    <div className='user-profile--CV--container'>
                        <div className='user-profile--CV--image-container'>
                            <img src={Docx} alt='DOCX' className='user-profile--CV--image' />
                        </div>
                        <p className='user-profile--CV--label'>{fileName}</p>
                    </div>
                )
            }
            else {
                return (
                    <div className='user-profile--CV--container'>
                        <div className='user-profile--CV--image-container'>
                            <img src={DefaultDoc} alt='DEFAULT' className='user-profile--CV--image' />
                        </div>
                        <p className='user-profile--CV--label'>{fileName}</p>
                    </div>
                )
            }
        }
        else {
            return (
                <p></p>
            )
        }
    }

    return (
        <div className='main_dashboard--container'>
            <div className='user-profile--container'>
                <h2 className='user-profile--title'>User information</h2>
                <p className='user-profile--label'>Name</p>
                <input className='user-profile--input' value={name} onChange={(event) => handleNameInput(event)} />
                <p className='user-profile--label'>Surname</p>
                <input className='user-profile--input' value={surname} onChange={(event) => handleSurnameInput(event)} />
                <p className='user-profile--label'>Phone number</p>
                <input className='user-profile--input' value={phoneNumber} onChange={(event) => handlePhoneInput(event)} />
                <p className='user-profile--label'>Position category</p>
                <div className='user-profile--select-button--container'>
                    {
                        buttonList.map((button, index) => {
                            return (
                                <button className={buttonList[index].active ? "user-profile--select-button-active" : "user-profile--select-button"} value={index} key={index} onClick={(event) => handlePositionCategory(event)}>{button.name}</button>
                            )
                        })
                    }
                </div>
                <p className='user-profile--label'>Experience level</p>
                <div className='user-profile--select-button--container'>
                    {
                        experienceLevel.map((exp, index) => {
                            return (
                                <button className={experienceLevel[index].active ? "user-profile--select-button-active" : "user-profile--select-button"} value={index} key={index} onClick={(event) => handleExperience(event)}>{exp.name}</button>
                            )
                        })
                    }
                </div>
                <p className='user-profile--label'>Minimum salary</p>
                <input className='user-profile--input' value={minSalary} onChange={(event) => handleMinSalary(event)} />
                <p className='user-profile--label'>Prefferd salary</p>
                <input className='user-profile--input' value={prefferedSalary} onChange={(event) => handlePrefferedSalary(event)} />

                <p className='user-profile--label'>Education</p>
                <div className='user-profile--select-button--container'>
                    {
                        educationList.map((education, index) => {
                            return (
                                <button className={educationList[index].active ? "user-profile--select-button-active" : "user-profile--select-button"} value={index} key={index} onClick={(event) => handleEducation(event)}>{education.name}</button>
                            )
                        })
                    }
                </div>
                <p className='user-profile--label'>City</p>
                <input className='user-profile--input' value={city} onChange={(event) => handleCity(event)} />
                <div className='user-profile--checkbox--container'>
                    <input className='user-profile--input-checkbox' type='checkbox' value={remoteWorking} onChange={(event) => handleRemoteWorking(event)} />
                    <p className='user-profile--label'>Only looking for remote job</p>
                </div>
                <p className='user-profile--label'>Contract type</p>
                <div className='user-profile--select-button--container'>
                    {
                        contractList.map((contract, index) => {
                            return (
                                <button className={contractList[index].active ? "user-profile--select-button-active" : "user-profile--select-button"} value={index} key={index} onClick={(event) => handleContractType(event)}>{contract.name}</button>
                            )
                        })
                    }
                </div>
                <p className='user-profile--label'>Attach CV</p>
                <Upload
                    fileList={fileList}
                    onChange={onChange}
                    beforeUpload={() => true}
                    onPreview={handlePreview}
                    customRequest={customRequest}
                >
                    <Button className='user-profile--upload-button' ><UploadOutlined /> Click to Upload</Button>
                </Upload>
                <CVFile />
            </div>
            <div className='user-profile--upload-button--container'>
                <button onClick={event => saveUserData(event)} className='user-profile--save-button'>Save</button>
            </div>
        </div>
    )
}

export default UserProfileDashboard