import React from 'react'

const SuggeestAnswer = (props) => {

    const clickHandler = () => {
        props.choosenOption(props.values.fields.title.stringValue)
    }

    return (
        <div key={props.i}>
            <button className='suggest-answer--button' onClick={clickHandler}>{props.values.fields.title.stringValue}</button>
        </div>
    )
}

export default SuggeestAnswer