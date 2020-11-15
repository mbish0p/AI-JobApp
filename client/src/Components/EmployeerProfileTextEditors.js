import React, { useState } from 'react';

const EmployeerProfileTextEditor = () => {
    const [aboutCompany, setAboutCompany] = useState('')
    const [createText, setCreateText] = useState('')
    const [reasonText, setReasonText] = useState('')
    return (
        <div className='employeer--description-container'>
            <h2 className='employeer--description-container--title'>About company</h2>
            <p className='employeer--description-container--label'>What does the company do?</p>
            <textarea
                className='employeer--description-container--textarea'
                placeholder='Write something about company, what are you doing, how you starting'
                value={aboutCompany}
                onChange={(event) => { setAboutCompany(event.target.value) }}
            />
            <p className='employeer--description-container--label'>What can you create with us?</p>
            <textarea
                className='employeer--description-container--textarea'
                placeholder='Write about current project'
                value={createText}
                onChange={(event) => { setCreateText(event.target.value) }}
            />
            <p className='employeer--description-container--label'>Why you should work with us?</p>
            <textarea
                className='employeer--description-container--textarea employeer--description-container--last-textarea'
                placeholder='Write about few reasons why employee should work with you'
                value={reasonText}
                onChange={(event) => { setReasonText(event.target.value) }}
            />
        </div>
    )
}
export default EmployeerProfileTextEditor