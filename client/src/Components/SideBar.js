import React from 'react'
import Avatar from 'react-avatar-edit'
import UserLogo from './UserLogo'

import '../styles/Sidebar.css'

class Sidebar extends React.Component {

    constructor(props) {
        super(props)
        const src = ''
        this.state = {
            preview: null,
            src
        }
        this.onCrop = this.onCrop.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)
    }

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
        return (
            <div className='sidebar--container'>
                {/*
                                <Avatar
                    width={390}
                    height={295}
                    onCrop={this.onCrop}
                    onClose={this.onClose}
                    onBeforeFileLoad={this.onBeforeFileLoad}
                    src={this.state.src}
                />
                {
                    this.state.preview ?
                        <img src={this.state.preview} alt="Preview" /> :
                        <p></p>
                }
            */}

                <div className='userlogo--container'>
                    <UserLogo />
                </div>
            </div>
        )
    }
}

export default Sidebar