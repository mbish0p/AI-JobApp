import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { saveMessage, deleteMessage } from '../_actions/message_actions'
import Message from './Sections/Message'
import SuggeestAnswer from './Sections/SuggestAnswer'
import { List, Icon, Avatar } from 'antd';
import { v4 as uuidv4 } from 'uuid'

const Chatbot = () => {

    const dispatch = useDispatch()
    const messagesFromRedux = useSelector(state => state.message.messages)

    useEffect(() => {
        eventQuery('welcomeToMyWebsite')
    }, [])

    const textQuery = async (text) => {

        let converstaion = {
            id: uuidv4(),
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
                    id: uuidv4(),
                    who: 'Arnold',
                    content: content
                }
            }

            dispatch(saveMessage(converstaion))
            console.log('Bot says', response)
        } catch (error) {
            converstaion = {
                id: uuidv4(),
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
                id: uuidv4(),
                who: 'Arnold',
                content: result
            }
            dispatch(saveMessage(converstaion))
        } catch (error) {
            let converstaion = {
                id: uuidv4(),
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

    const choosenOption = (buttonTitle, id) => {
        console.log(buttonTitle)
        console.log(id)
        dispatch(deleteMessage(id))

        const converstaion = {
            id: uuidv4(),
            who: 'User',
            content: {
                text: {
                    text: buttonTitle
                }
            }
        }
        dispatch(saveMessage(converstaion))

    }

    const renderSuggestedAnswer = (values, id) => {
        return values.map((value, i) => {
            return <SuggeestAnswer key={i} values={value.structValue} choosenOption={choosenOption} id={id} />
        })
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

            const AvatarSrc = message.who === 'bot' ? <Icon type="robot" /> : <Icon type="smile" />

            return <div key={i}>
                <List.Item style={{ padding: '1rem' }}>
                    <List.Item.Meta
                        avatar={<Avatar icon={AvatarSrc} />}
                        title={message.who}
                        description={renderSuggestedAnswer(message.content.payload.fields.quick_replies.listValue.values, message.id)}
                    />
                </List.Item>
            </div>
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