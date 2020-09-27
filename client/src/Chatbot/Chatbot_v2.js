import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { saveMessage, deleteMessage } from '../_actions/message_actions'
import Message from './Sections/Message'
import SuggeestAnswer from './Sections/SuggestAnswer'
import JobOfferForm from './Sections/JobOfferForm'
import { List, Avatar, Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid'
import { MinusOutlined, UpOutlined, SmileOutlined, RobotOutlined } from '@ant-design/icons';
import { CSSTransition } from 'react-transition-group';


const Chatbot = () => {

    const { Title } = Typography;

    const dispatch = useDispatch()
    const messagesFromRedux = useSelector(state => state.message.messages)
    const messagesEndRef = useRef(null)
    const [minimizeChat, setMinimizeChat] = useState(true)


    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        eventQuery('welcomeToMyWebsite')
    }, [])

    useEffect(() => {
        scrollToBottom()
    })

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
        dispatch(deleteMessage(id))
        textQuery(buttonTitle)
    }

    const renderSuggestedAnswer = (values, id) => {
        return values.map((value, i) => {
            return <SuggeestAnswer key={i} values={value.structValue} choosenOption={choosenOption} id={id} />
        })
    }

    const renderJobOfferForm = (content) => {
        return <JobOfferForm content={content} submitJobForm={() => textQuery("Submitted")} />
    }

    const minimizeChatTamplate = () => {
        setMinimizeChat(!minimizeChat)
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
        } else if (message.content && message.content.payload.fields && message.content.payload.fields.quick_replies) {

            const AvatarSrc = message.who === 'bot' ? <RobotOutlined /> : <SmileOutlined />

            return <div key={i}>
                <List.Item style={{ padding: '1rem' }}>
                    <List.Item.Meta
                        avatar={<Avatar icon={AvatarSrc} />}
                        title={message.who}
                        description={renderSuggestedAnswer(message.content.payload.fields.quick_replies.listValue.values, message.id)}
                    />
                </List.Item>
            </div>
        } else if (message.content && message.content.payload.fields && message.content.payload.fields.create_job_form) {

            const AvatarSrc = message.who === 'bot' ? <RobotOutlined /> : <SmileOutlined />

            console.log('Job offer', message.content.payload.fields.create_job_form.listValue.values[0].structValue)
            return <div key={i}>
                <List.Item style={{ padding: '1rem' }}>
                    <List.Item.Meta
                        avatar={<Avatar icon={AvatarSrc} />}
                        title={message.who}
                        description={renderJobOfferForm(message.content.payload.fields.create_job_form.listValue.values[0].structValue, message.id)}
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

        minimizeChat ?
            <CSSTransition
                in={minimizeChat}
                timeout={600}
                classNames='fade'
                appear={true}
            >
                <div>
                    <div>
                        <div className='chat--header' >
                            <Title level={2} style={{ margin: '4px 12px' }}><RobotOutlined />  Arnold &nbsp;</Title>
                            <button className='chat--minimize-button' onClick={minimizeChatTamplate}><MinusOutlined /></button>
                        </div>
                        <div style={{ height: '650px', width: 500, border: 'solid 3px black', borderRadius: '0px 0px 7px 7px', margin: 0 }}>

                            <div style={{ height: '599px', width: '100%', overflow: 'auto' }}>
                                {renderMessages(messagesFromRedux)}
                                <div ref={messagesEndRef} />
                            </div>
                            <input className='mmm' style={{ width: '100%', height: '45px', borderRadius: '4px', margin: 0, padding: '5px', fontSize: '1rem' }}
                                placeholder='Send a message'
                                onKeyPress={sumbitHandler}
                                type='text'
                            />
                        </div>
                    </div>
                </div>
            </CSSTransition>
            :
            <div className='chat--minimize'>
                <div className='chat--header-minimize' >
                    <Title level={2} style={{ margin: '4px 12px' }}><RobotOutlined />  Arnold &nbsp;</Title>
                    <button className='chat--minimize-button' onClick={minimizeChatTamplate}><UpOutlined /></button>
                </div>
                <div ref={messagesEndRef} />
            </div>
    )
}

export default Chatbot