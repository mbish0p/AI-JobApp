import React from 'react'
import { List, Icon, Avatar } from 'antd';

function Message(props) {

    const AvatarSrc = props.who === 'Arnold' ? <Icon type="robot" /> : <Icon type="smile" />
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
