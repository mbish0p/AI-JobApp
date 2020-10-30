import React, { useEffect, useState } from 'react'
import { Avatar } from 'antd';
import logo from '../img/default-avatar-profile.jpg'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import UserPicModal from './UserPicModal'


const UserLogo = () => {
    const history = useHistory()
    const [imgUrl, setImgUrl] = useState('')
    const [image, setImage] = useState({})
    const [visible, setVisable] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [ModalText, setModalText] = useState('Content of the modal')
    const [show, setShow] = useState(false)

    useEffect(() => {


        const tryFetchPic = async () => {
            try {
                const result = await axios.get('http://localhost:5000/employee/image', { withCredentials: true })
                console.log(result.data)
                console.log('Successful fetch img url')
                setImgUrl(result.data.file)
            } catch (error) {
                console.log(error.response)
                if (error.response.data.error.message === 'jwt expired')
                    try {
                        const result = await axios('http://localhost:5000/users/refresh', {
                            withCredentials: true,
                            method: 'POST'
                        })
                        console.log(result)
                        if (result.status === 201) {
                            const finallResult = await axios.get('http://localhost:5000/employee/image', { withCredentials: true })
                            if (finallResult.data.file) {
                                console.log('Successful fetch img url')
                                setImgUrl(finallResult.data.file)
                            }
                        }
                    } catch (error) {
                        console.log(error.response)
                        if (error.response.status === 400) {
                            history.push('/')
                        }
                    }
            }
        }
        tryFetchPic()
    }, [])

    const handleChangePicture = () => {
        console.log('Cliked image')
        setShow(true)
        console.log('setting to true')
    }

    const closeModal = () => {
        console.log('setting to false')
        setShow(false)
    }

    return (
        <div>
            <div onClick={handleChangePicture} className='userlogo--container'>
                <Avatar className='user--photo' src={imgUrl || logo} />
            </div>
            <UserPicModal show={show} closeModal={closeModal} />
        </div>
    )
}


export default UserLogo