import { Modal } from 'antd';
import React from 'react'
import Avatar from 'react-avatar-edit'

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
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
            this.props.closeModal()
        }, 2000);
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
        //console.log(preview)
        this.setState({ preview })
    }

    onBeforeFileLoad(elem) {
        if (elem.target.files[0].size > 71680) {
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