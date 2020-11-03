import React, { useState } from 'react'
import { Avatar } from 'antd';
import logo from '../img/default-avatar-profile.jpg'
import EmployeerPicModal from './EmployeerPicModal'
import UserPicModal from './UserPicModal'
import { useSelector } from 'react-redux'


const UserLogo = (props) => {
    const userInfo = useSelector(state => state.user)
    const [show, setShow] = useState(false)

    const handleChangePicture = () => {
        console.log('Cliked image')
        setShow(true)
        console.log('setting to true')
    }

    const closeModal = () => {
        console.log('setting to false')
        setShow(false)
    }

    console.log('asdasdasasd', props)

    return (
        <div>
            <div onClick={handleChangePicture} className='userlogo--container'>
                <Avatar className='user--photo' src={props.imgUrl || logo} />
            </div>
            {
                userInfo.isEmployeer ?
                    <EmployeerPicModal show={show} closeModal={closeModal} setNewImage={props.setImgUrl} /> :
                    <UserPicModal show={show} closeModal={closeModal} setNewImage={props.setNewImage} />
            }
        </div>
    )
}


export default UserLogo