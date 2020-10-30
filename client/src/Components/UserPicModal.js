import { Modal } from 'antd';
import React from 'react'
import Avatar from 'react-avatar-edit'
import axios from 'axios'

class UserPicModel extends React.Component {
    constructor(props) {
        super(props)

        const src = ''

        this.state = {
            visible: false,
            confirmLoading: false,
            preview: null,
            src
        }
    }


    componentDidUpdate(prevProps) {
        if (prevProps.show !== this.props.show) {
            if (this.props.show) {
                this.showModal()
            }
        }
    }

    convert64toBlob = () => {
        const contentType = this.state.preview.slice(5, this.state.preview.indexOf(';base64'))
        const b64Content = this.state.preview.slice(this.state.preview.indexOf(';base64') + 8)

        const byteCharacters = atob(b64Content);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: contentType });
        return blob
    }

    uploadImage = async (image) => {

        let data = new FormData();
        data.append('file', image, 'user_pic.png');
        data.append('name', 'employee image')

        try {
            const uploadImageResponse = await axios.post('http://localhost:5000/files', data, {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`
                }, withCredentials: true
            })

            console.log(uploadImageResponse.data)
            console.log('Successful upload image')
            return uploadImageResponse.data.file
        } catch (error) {
            console.log(error.response)
            if (error.response.data.error.message === 'jwt expired')
                try {
                    const result = await axios('http://localhost:5000/users/refresh', {
                        withCredentials: true,
                        method: 'POST'
                    })

                    if (result.status === 201) {
                        const finallResult = await axios.post('http://localhost:5000/files', data, {
                            headers: {
                                'Content-Type': `multipart/form-data; boundary=${data._boundary}`
                            }, withCredentials: true
                        })
                        if (finallResult.data.file) {
                            console.log(finallResult.data)
                            console.log('Successful upload image')
                            return finallResult.data.file
                        }
                    }
                } catch (error) {
                    console.log(error.response)
                }
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = async () => {
        this.setState({
            confirmLoading: true,
        });

        const blob = this.convert64toBlob()
        const response = await this.uploadImage(blob)
        console.log(response)

        this.setState({
            visible: false,
            confirmLoading: false,
        });
        this.props.closeModal()
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
        this.props.closeModal()
    };

    onClose() {
        this.setState({ preview: null })
    }

    onCrop(preview) {
        console.log(preview)
        this.setState({ preview })
    }

    onBeforeFileLoad(elem) {
        if (elem.target.files[0].size > 1000000) {
            alert("File is too big!");
            elem.target.value = "";
        };
    }

    render() {
        const { visible, confirmLoading } = this.state;
        return (
            <div>
                <Modal
                    title="Title"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <Avatar
                        width={390}
                        height={295}
                        onCrop={(preview) => this.onCrop(preview)}
                        onClose={() => this.onClose()}
                        onBeforeFileLoad={(elem) => this.onBeforeFileLoad(elem)}
                        src={this.state.src}
                    />
                    {
                        this.state.preview ?
                            <img src={this.state.preview} alt="Preview" /> :
                            <p></p>
                    }
                </Modal>
            </div>
        );
    }
}

export default UserPicModel