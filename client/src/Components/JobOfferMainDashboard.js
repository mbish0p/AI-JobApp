import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Avatar } from 'antd';
import logo from '../img/default-avatar-profile.jpg'
import moment from 'moment'
import { StarOutlined, StarFilled } from '@ant-design/icons'
import Location from '../img/placeholder.svg'
import Remote from '../img/online-support.svg'
import Contract from '../img/contract.svg'

const JobOfferMainDashboard = (props) => {
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
                    <div className='jobOffer--main-container'>
                        <div className='jobOffer--header--contaier'>
                            <div className='jobOffer--company--logo'>
                                <Avatar src={employeer.company_logo || logo} className='jobOffer--company--logo-image' />
                                <p className='jobOffer--company--logo-name'>{employeer.company_name}</p>
                            </div>
                            <div className='jobOffer--right-header'>
                                <div className='jobOffer--added-timestamp--container'>
                                    <p className="jobOffer--_tmp"></p>
                                    <p className='jobOffer--company--added-date'>Added : {moment(props.offer.offer.start_date).format("D MMMM YYYY")}</p>
                                </div>
                                <div className='jobOffer--title--container'>
                                    <h2 className='jobOffer--company--title'>{props.offer.offer.title}</h2>
                                    <p className='jobOffer--company--experience'>{props.offer.offer.experience_lvl}</p>
                                </div>
                            </div>
                        </div>
                        <div className='jobOffer--main-content--container'>
                            <div className='jobOffer--main-content-rightside'>
                                <div className='jobOffer--company--main-content'>
                                    <h3 className='jobOffer--company--main-content-title'>Description</h3>
                                    <p className='jobOffer--company--description'>{props.offer.offer.description}</p>
                                    <h3 className='jobOffer--company--technologies--label'>Technologies which we're looking for</h3>
                                    <div className='jobOffer--company--technologies' >
                                        <ul>
                                            {
                                                props.offer.techs.map((tech, index) => {
                                                    return (
                                                        <li key={index} className='jobOffer--company--technology'>
                                                            <div className='jobOffer--company--technology-container'>
                                                                <div className='jobOffer--company--technology-content'>
                                                                    <p className='jobOffer--company--technology--name'>{tech.name}: </p>
                                                                    <p className='jobOffer--company--technology--exp'>{`at least ${tech.experience} months`}</p>
                                                                </div>
                                                                {
                                                                    tech.main_technology ?
                                                                        <StarFilled className={"jobOffer--main-technology-true"} /> :
                                                                        <StarOutlined className="jobOffer--main-technology-false" />
                                                                }
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='jobOffer--apply-container-leftside'>
                                <div className='jobOffer--company--apply-container'>
                                    <div className='jobOffer--company--salary-container'>
                                        <p className='jobOffer--company--salary'>{props.offer.offer.min_salary}</p>
                                        <p className='jobOffer--company--separator'>-</p>
                                        <p className='jobOffer--company--salary'>{props.offer.offer.max_salary}</p>
                                        <p className='jobOffer--company--currency'>{props.offer.offer.currency}</p>
                                    </div>
                                    <div className='jobOffer--company--body-container'>
                                        {
                                            props.offer.offer.online_interview ? <div className='jobOffer--company--interview-container'>
                                                <img className='jobOffer--company--interview-logo' src={Remote} alt="Remote Logo" />
                                                <p className='jobOffer--company--interview-label'> Online interview</p>
                                            </div> : ''
                                        }
                                        <div className='jobOffer--company--interview-container'>
                                            <img className='jobOffer--company--interview-logo' src={Contract} alt='Contract' />
                                            <p className='jobOffer--company--interview-label'>{props.offer.offer.contract_type}</p>
                                        </div>
                                        <div className='jobOffer--company--interview-container'>
                                            <img className='jobOffer--company--interview-logo' src={Location} alt="Location" />
                                            <p className='jobOffer--company--interview-label'>{props.offer.offer.city}, {props.offer.offer.street}</p>
                                        </div>
                                        <div className='jobOffer--company--remote-container'>
                                            <p className='jobOffer--company--remote-label'>Remote possible</p>
                                            <p className='jobOffer--company--remote-value'>{props.offer.offer.remote_work}%</p>
                                        </div>
                                        <button className='jobOffer--company--apply'>Apply</button>
                                    </div>
                                </div>
                            </div>
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