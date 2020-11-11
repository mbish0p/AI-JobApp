import React, { useState, useEffect } from 'react'
import { Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import axios from 'axios'


const EmployeerProfileFormPhotos = () => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [fileList, setFileList] = useState([]);


    useEffect(() => {
        fetchEmployeerPhotos()
    }, [])

    const fetchEmployeerPhotos = async () => {
        try {
            const photosResponse = await axios.get('http://localhost:5000/employeer-files', { withCredentials: true })
            console.log(photosResponse.data)
            setFetchFiles(photosResponse.data)
        } catch (error) {
            console.log(error.response)
            if (error.response.data.error.message === 'jwt expired')
                try {
                    const result = await axios('http://localhost:5000/users/refresh', {
                        withCredentials: true,
                        method: 'POST'
                    })
                    if (result.status === 201) {
                        const photosResponse = await axios.get('http://localhost:5000/employeer-files', { withCredentials: true })
                        if (photosResponse.data) {
                            console.log(photosResponse.data)
                            console.log('Successful fetch image')
                            setFetchFiles(photosResponse.data)
                        }
                    }
                } catch (error) {
                    console.log(error.response)
                }
        }
    }

    const removePicture = async (file) => {
        if (file.inDb) {
            try {
                const removePicture = await axios.delete(`http://localhost:5000/employeer-files/${file.uid}`, { withCredentials: true })
                console.log(removePicture.data)
            } catch (error) {
                console.log(error.response)
                if (error.response.data.error.message === 'jwt expired')
                    try {
                        const result = await axios('http://localhost:5000/users/refresh', {
                            withCredentials: true,
                            method: 'POST'
                        })
                        if (result.status === 201) {
                            const removePicture = await axios.delete(`http://localhost:5000/employeer-files/${file.uid}`, { withCredentials: true })
                            console.log(removePicture.data)
                        }
                    } catch (error) {
                        console.log(error.response)
                    }
            }
        }
    }

    const setFetchFiles = (fetchedFiles) => {
        const photoList = [...fileList]
        for (let i = 0; i < fetchedFiles.length; i++) {
            const file = fetchedFiles[i]
            const newFile = {
                uid: file.id,
                inDb: true,
                name: file.name + '.png',
                status: 'done',
                url: file.file,
                originFileObj: {
                    description: file.description
                },
                isChange: false
            }
            photoList.push(newFile)
        }
        setFileList(photoList)
    }

    const onChange = ({ fileList: newFileList }) => {
        console.log('newFileList:', newFileList)
        setFileList(newFileList);
    };

    const handlePhotoDescription = (event, index) => {
        const { value } = event.target
        const photoList = [...fileList]

        if (photoList[index].isChange === false && photoList[index].inDb) {
            photoList[index].originFileObj.description = value
            photoList[index].isChange = true
        } else {
            photoList[index].originFileObj.description = value
        }
        setFileList(photoList)
    }

    const onPreview = async file => {
        let src = file.url;
        console.log('file', file)
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    const uploadPhotos = async () => {
        for (let i = 0; i < fileList.length; i++) {

            const file = fileList[i]
            if (!file.inDb) {
                const blob = convert64toBlob(file.thumbUrl)
                let data = new FormData();
                data.append('file', blob, file.name);
                data.append('name', file.name)
                if (file.originFileObj.description) data.append('description', file.originFileObj.description)

                try {
                    const uploadImage = await axios.post('http://localhost:5000/employeer-files', data, {
                        headers: {
                            'Content-Type': `multipart/form-data; boundary=${data._boundary}`
                        }, withCredentials: true
                    })
                    console.log(uploadImage.data)
                    console.log('Successful upload image')
                } catch (error) {
                    console.log(error.response)
                    if (error.response.data.error.message === 'jwt expired')
                        try {
                            const result = await axios('http://localhost:5000/users/refresh', {
                                withCredentials: true,
                                method: 'POST'
                            })
                            if (result.status === 201) {
                                const uploadImage = await axios.post('http://localhost:5000/employeer-files', data, {
                                    headers: {
                                        'Content-Type': `multipart/form-data; boundary=${data._boundary}`
                                    }, withCredentials: true
                                })
                                if (uploadImage.data.file) {
                                    console.log(uploadImage.data)
                                    console.log('Successful upload image')
                                }
                            }
                        } catch (error) {
                            console.log(error.response)
                        }
                }
            }
        }
    }

    const updatePhotos = async () => {
        for (let i = 0; i < fileList.length; i++) {

            const file = fileList[i]
            if (file.inDb && file.isChange) {
                let data = new FormData();
                if (file.originFileObj.description) data.append('description', file.originFileObj.description)

                try {
                    const uploadImage = await axios.patch(`http://localhost:5000/employeer-files/${file.uid}`, data, {
                        headers: {
                            'Content-Type': `multipart/form-data; boundary=${data._boundary}`
                        }, withCredentials: true
                    })
                    console.log(uploadImage.data)
                    fileList[i].isChange = false
                } catch (error) {
                    console.log(error.response)
                    if (error.response.data.error.message === 'jwt expired')
                        try {
                            const result = await axios('http://localhost:5000/users/refresh', {
                                withCredentials: true,
                                method: 'POST'
                            })
                            if (result.status === 201) {
                                const uploadImage = await axios.patch(`http://localhost:5000/employeer-files/${file.uid}`, data, {
                                    headers: {
                                        'Content-Type': `multipart/form-data; boundary=${data._boundary}`
                                    }, withCredentials: true
                                })
                                if (uploadImage.data) {
                                    console.log(uploadImage.data)
                                    fileList[i].isChange = false
                                }
                            }
                        } catch (error) {
                            console.log(error.response)
                        }
                }
            }
        }
    }

    const convert64toBlob = (image) => {
        const contentType = image.slice(5, image.indexOf(';base64'))
        const b64Content = image.slice(image.indexOf(';base64') + 8)

        const byteCharacters = atob(b64Content);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: contentType });
        return blob
    }

    const customRequest = ({ file, onSuccess }) => {
        file.inDb = false
        setTimeout(() => {
            onSuccess('done')
        }, 1000)
    }

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);

        uploadPhotos()
        updatePhotos()

        setVisible(false);
        setConfirmLoading(false);
    };

    const beforeUpload = (file) => {
        console.log(file)
        file.description = 'Tell history behind this picture'
        return true
    }

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    return (
        <div>
            <h2>Company photos</h2>
            {
                (fileList.length > 0) ? (
                    <div>
                        <div className='ant-modal-body'>
                            <ImgCrop rotate>
                                <Upload
                                    listType="picture-card"
                                    fileList={fileList}
                                    customRequest={customRequest}
                                    onChange={onChange}
                                    beforeUpload={beforeUpload}
                                    onPreview={onPreview}
                                    onRemove={removePicture}
                                >
                                </Upload>
                            </ImgCrop>


                            <div className='employeer--photo-description--container'>
                                {fileList.map((file, index) => {
                                    return <textarea
                                        key={index}
                                        className='employeer--photo-description'
                                        placeholder='Tell history behind this picture'
                                        value={file.originFileObj.description}
                                        onChange={(event) => handlePhotoDescription(event, index)}
                                    />
                                })}
                            </div>
                        </div>
                        <button onClick={showModal}>Add</button>
                    </div>
                ) : <button onClick={showModal}>Add</button>
            }

            <Modal
                title="Title"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <ImgCrop rotate>
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        customRequest={customRequest}
                        onChange={onChange}
                        beforeUpload={beforeUpload}
                        onPreview={onPreview}
                        onRemove={removePicture}
                    >
                        {fileList.length < 5 && '+ Upload'}
                    </Upload>
                </ImgCrop>


                <div className='employeer--photo-description--container'>
                    {fileList.map((file, index) => {
                        return <textarea
                            key={index}
                            className='employeer--photo-description'
                            value={file.originFileObj.description}
                            onChange={(event) => handlePhotoDescription(event, index)}
                        />
                    })}
                </div>
            </Modal>
        </div>
    )
}

export default EmployeerProfileFormPhotos