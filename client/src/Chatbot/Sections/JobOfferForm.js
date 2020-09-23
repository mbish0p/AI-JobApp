import React, { useState } from 'react'


const JobOfferForm = (props) => {
    console.log(props.content)
    switch (props.content.fields.Role.stringValue) {
        case '0':

            const [selectValue, setSelectValue] = useState(undefined)

            const text = props.content.fields.text.stringValue
            const selectChildern = props.content.fields.Select_input_childrens.listValue.values
            console.log(selectChildern)

            const submitSelectForm = (event) => {
                event.preventDefault()

                console.log(selectValue)
            }
            return (
                <div>
                    <p>{text}</p>
                    <form>
                        <p>Job kategory - please choose one role</p>
                        <select value={selectValue} onChange={(event) => setSelectValue(event.target.value)}>
                            {selectChildern.map((child, index) => {
                                return <option key={index} value={child.stringValue.toLowerCase()}>{child.stringValue}</option>
                            })}
                        </select>
                    </form>
                    <button onClick={submitSelectForm}>Submit</button>
                </div>
            )
        default:
            console.log('default')
    }
}

export default JobOfferForm