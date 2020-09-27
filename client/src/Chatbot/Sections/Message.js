import React from 'react'
import { List, Avatar } from 'antd';
import { SmileOutlined, RobotOutlined } from '@ant-design/icons';

function Message(props) {

    const AvatarSrc = props.who === 'Arnold' ? <RobotOutlined /> : <SmileOutlined />
    const who = props.who === 'Arnold' ? 'bot-message' : 'user-message'
    return (
        <List.Item style={{ padding: '1rem' }}>
            <List.Item.Meta
                className={who + ' message-container'}
                avatar={<Avatar icon={AvatarSrc} />}
                title={props.who}
                description={props.text}
            />
        </List.Item>
    )
}

export default Message
