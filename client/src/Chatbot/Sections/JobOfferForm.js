import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveJobCategory } from '../../_actions/jobOffer_action'


const JobOfferForm = (props) => {
    const dispatch = useDispatch()
    console.log(props.content)
    switch (props.content.fields.Role.stringValue) {
        case '0':

            const [selectValue, setSelectValue] = useState(undefined)

            let text = props.content.fields.text.stringValue
            const selectChildern = props.content.fields.Select_input_childrens.listValue.values
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
        default:
            console.log('default')
    }
}

export default JobOfferForm