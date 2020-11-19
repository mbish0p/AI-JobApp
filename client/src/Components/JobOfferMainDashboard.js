import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Avatar } from 'antd';
import logo from '../img/default-avatar-profile.jpg'
import moment from 'moment'
import { StarOutlined, FileDoneOutlined } from '@ant-design/icons'
import Location from '../img/placeholder.svg'
import Remote from '../img/online-support.svg'

const JobOfferMainDashboard = (props) => {
    const offer = props.offer
    console.log(props)
    moment().format();
    const [employeer, setEmployeer] = useState('')

    useEffect(() => {
        if (props.offer) {
            fetchEmployeer(props.offer.offer.employeerId)
        }
    }, [props.offer])

    const fetchEmployeer = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/employeer/${id}`)
            console.log(response)
            setEmployeer(response.data.employeer)
        } catch (error) {
            console.log(error)
        }
    }
    const Offer = () => {
        if (props.offer) {
            return (
                <div className='jobOffer--data-container'>
                    <div>
                        <div>
                            <Avatar src={employeer.company_logo || logo} className='' />
                            <p>{employeer.company_name}</p>
                        </div>
                        <p>Added : {moment(props.offer.offer.start_date).format("D MMMM YYYY")}</p>
                        <h2>{props.offer.offer.title}</h2>
                        <p>{props.offer.offer.experience_lvl}</p>
                    </div>

                    <div>
                        <p>{props.offer.offer.description}</p>
                        <p>Technologies which we're looking for</p>
                        {
                            props.offer.techs.map((tech, index) => {
                                return (
                                    <div key={index}>
                                        <p>{tech.name}</p>
                                        <StarOutlined className={tech.main_technology ? "jobOffer--main-technology-true" : "jobOffer--main-technology-false"} />
                                        <p>{`At least ${tech.experience} months`}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div>
                        <div>
                            <p>{props.offer.offer.min_salary}</p>
                            <p>____</p>
                            <p>{props.offer.offer.max_salary}</p>
                            <p>{props.offer.offer.currency}</p>
                        </div>
                        <div>
                            {
                                props.offer.offer.online_interview ? <div>
                                    <img src={Remote} alt="Remote Logo" className='joboffer--location--image' />
                                    <p> Online interview</p>
                                </div> : ''
                            }
                            <div>
                                <FileDoneOutlined />
                                <p>{props.offer.offer.contract_type}</p>
                            </div>
                            <div>
                                <img src={Location} alt="Location" className='joboffer--location--image' />
                                <p>{props.offer.offer.city}</p>
                                <p>{props.offer.offer.street}</p>
                            </div>
                            <div>
                                <p>Remote possible</p>
                                <p>{props.offer.offer.remote_work}%</p>
                            </div>
                            <button>Apply</button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <p></p>
            )
        }
    }

    return (
        <Offer />
    )
}

export default JobOfferMainDashboard