import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { saveMessage } from '../_actions/message_actions'
import Message from './Sections/Message'

const Chatbot = () => {

    const dispatch = useDispatch()
    const messagesFromRedux = useSelector(state => state.message.messages)

    useEffect(() => {
        eventQuery('welcomeToMyWebsite')
    }, [])

    const textQuery = async (text) => {

        let converstaion = {
            who: 'User',
            content: {
                text: {
                    text
                }
            }
        }
        dispatch(saveMessage(converstaion))
        console.log('User says ', converstaion)
        const queryInput = {
            text
        }
        try {
            const response = await axios({
                method: 'POST',
                url: '/api/dialogflow/textQuery',
                data: queryInput
            })

            for (let content of response.data.fulfillmentMessages) {

                converstaion = {
                    who: 'Arnold',
                    content: content
                }
                console.log('response from Arnold ', converstaion)
            }

            dispatch(saveMessage(converstaion))
            console.log('Bot says', response)
        } catch (error) {
            converstaion = {
                who: 'Arnold',
                content: {
                    text: {
                        text: 'Error just occured, check the problem'
                    }
                }
            }
            dispatch(saveMessage(converstaion))
        }
    }



    const eventQuery = async (text) => {

        const queryInput = {
            event: text
        }
        try {
            const response = await axios({
                method: 'POST',
                url: '/api/dialogflow/eventQuery',
                data: queryInput
            })
            const result = response.data.fulfillmentMessages[0]
            let converstaion = {
                who: 'Arnold',
                content: result
            }
            dispatch(saveMessage(converstaion))
        } catch (error) {
            let converstaion = {
                who: 'Arnold',
                content: {
                    text: {
                        text: 'Error just occured, check the problem'
                    }
                }
            }
            dispatch(saveMessage(converstaion))
        }
    }

    const sumbitHandler = (e) => {
        if (e.key === 'Enter') {

            if (!e.target.value) {
                alert('You need type some message')
            }

            textQuery(e.target.value)

            e.target.value = ""
        }
    }

    const renderOneTextMessage = (message, i) => {
        console.log(message)
        if (message.content && message.content.text && message.content.text.text) {
            const isAnyContent = message.content.text.text[0] !== ""
            return (
                isAnyContent ?
                    <Message key={i} who={message.who} text={message.content.text.text} /> :
                    null
            )
        } else if (message.content && message.content.payload.fields) {
            console.log('doopsko')
        }
    }

    const renderMessages = (messages) => {

        if (messages) {
            return messages.map((message, i) => {
                return renderOneTextMessage(message, i)
            })
        }
        else {
            return null
        }
    }

    return (
        <div>
            <div style={{ height: '650px', width: 500, border: 'solid 3px black', borderRadius: '7px', margin: 0 }}>

                <div style={{ height: '599px', width: '100%', overflow: 'auto' }}>
                    {renderMessages(messagesFromRedux)}
                </div>
                <input style={{ width: '100%', height: '45px', borderRadius: '4px', margin: 0, padding: '5px', fontSize: '1rem' }}
                    placeholder='Send a message'
                    onKeyPress={sumbitHandler}
                    type='text'
                />
            </div>
        </div>
    )
}

export default Chatbot