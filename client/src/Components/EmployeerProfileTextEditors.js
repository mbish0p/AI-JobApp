import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { saveDescriptionOne, saveDescriptionTwo, saveDescriptionThree } from '../_actions/userEmployeer'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const EmployeerProfileTextEditor = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [aboutCompany, setAboutCompany] = useState('')
    const [createText, setCreateText] = useState('')
    const [reasonText, setReasonText] = useState('')

    const fetchDescriptions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/employeer-description', { withCredentials: true })
            setDescriptions(response.data)
        } catch (error) {
            console.log(error.response)
            if (error.response.data.error.message === 'jwt expired')
                try {
                    const result = await axios('http://localhost:5000/users/refresh', {
                        withCredentials: true,
                        method: 'POST'
                    })
                    if (result.status === 201) {
                        const response = await axios.get('http://localhost:5000/employeer-description', { withCredentials: true })
                        setDescriptions(response.data)
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
        fetchDescriptions()
    })

    const setDescriptions = (descriptionList) => {
        for (let i = 0; i < descriptionList.length; i++) {
            const desc = descriptionList[i]

            if (desc.name === 'What does the company do') {
                setAboutCompany(desc.description)
                dispatch(saveDescriptionOne(desc.description))
            }
            if (desc.name === 'What can you create with us') {
                setCreateText(desc.description)
                dispatch(saveDescriptionTwo(desc.description))
            }
            if (desc.name === 'Why you should work with us') {
                setReasonText(desc.description)
                dispatch(saveDescriptionThree(desc.description))
            }
        }
    }

    const saveFirstTextarea = (event) => {
        setAboutCompany(event.target.value)
        dispatch(saveDescriptionOne({ description: event.target.value }))
    }

    const saveSecondTextarea = (event) => {
        setCreateText(event.target.value)
        dispatch(saveDescriptionTwo({ description: event.target.value }))
    }

    const saveThirdTextarea = (event) => {
        setReasonText(event.target.value)
        dispatch(saveDescriptionThree({ description: event.target.value }))
    }

    return (
        <div className='employeer--description-container'>
            <h2 className='employeer--description-container--title'>About company</h2>
            <p className='employeer--description-container--label'>What does the company do?</p>
            <textarea
                className='employeer--description-container--textarea'
                placeholder='Write something about company, what are you doing, how you starting'
                value={aboutCompany}
                onChange={(event) => saveFirstTextarea(event)}
            />
            <p className='employeer--description-container--label'>What can you create with us?</p>
            <textarea
                className='employeer--description-container--textarea'
                placeholder='Write about current project'
                value={createText}
                onChange={(event) => saveSecondTextarea(event)}
            />
            <p className='employeer--description-container--label'>Why you should work with us?</p>
            <textarea
                className='employeer--description-container--textarea employeer--description-container--last-textarea'
                placeholder='Write about few reasons why employee should work with you'
                value={reasonText}
                onChange={(event) => saveThirdTextarea(event)}
            />
        </div>
    )
}
export default EmployeerProfileTextEditor