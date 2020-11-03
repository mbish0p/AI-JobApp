import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { saveEmployeerData } from '../_actions/userEmployeer'

const EmployeeInfo = () => {

    const employeerInfo = useSelector(state => state.userEmployeer)
    const dispatch = useDispatch()

    if (!employeerInfo.employeerId) {
        axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:5000/employeer'
        }).then((response) => {
            console.log(response)
            dispatch(saveEmployeerData({
                company_name: response.data.company_name,
                phone_number: response.data.phone_number,
                employeerId: response.data.id,
                company_logo: response.data.company_logo
            }))
        }).catch((error) => {
            console.log(error)
            console.log(error.response)
        })
    }
    return (
        <div className="employee--info">
            <h3 className='employee--name'>{employeerInfo.company_name}</h3>
        </div>
    )
}

export default EmployeeInfo