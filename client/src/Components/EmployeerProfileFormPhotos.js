import React, { useState } from 'react'
import { Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import axios from 'axios'


const EmployeerProfileFormPhotos = () => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [descriptionList, setDescriptionList] = useState([{ description: '' }])


    const onChange = ({ fileList: newFileList }) => {
        console.log('newFileList:', newFileList)
        setFileList(newFileList);
    };

    const handlePhotoDescription = (event, index) => {
        const { value } = event.target
        const descList = [...descriptionList]

        descList[index].description = value
        setDescriptionList(descList)
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

    const uploadPhotos = () => {

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
        setTimeout(() => {
            const descList = [...descriptionList]
            descList.push({ description: '' })
            setDescriptionList(descList)
            onSuccess('ok')
        }, 0)
    }

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);

        uploadPhotos()

        setVisible(false);
        setConfirmLoading(false);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    return (
        <div>
            <h2>Company photos</h2>
            <button onClick={showModal}>Add</button>
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
                        onPreview={onPreview}
                    >
                        {fileList.length < 5 && '+ Upload'}
                    </Upload>
                </ImgCrop>


                <div className='employeer--photo-description--container'>
                    {fileList.map((file, index) => {
                        return <textarea
                            key={index}
                            className='employeer--photo-description'
                            placeholder='Tell history behind this picture'
                            value={descriptionList[index].description}
                            onChange={(event) => handlePhotoDescription(event, index)}
                        />
                    })}
                </div>
            </Modal>
        </div>
    )
}

export default EmployeerProfileFormPhotos