import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Pagination } from 'antd';
import JobOffer from './JobOffer'


const MainDashboard = () => {

    const history = useHistory()
    const [offers, setOffers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const fetchOffers = async () => {
        try {
            const firstResult = await axios.get('http://localhost:5000/job-offer/all', { withCredentials: true })
            console.log(firstResult)
            return firstResult.data
        } catch (error) {
            console.log(error.response)
            if (error.response && error.response.data.error.message === 'jwt expired') {
                try {
                    const result = await axios('http://localhost:5000/users/refresh', {
                        withCredentials: true,
                        method: 'POST'
                    })
                    console.log(result)
                    if (result.status === 201) {
                        const result = await axios.get('http://localhost:5000/job-offer/all', { withCredentials: true })
                        console.log(result)
                        return result.data
                    }
                } catch (error) {
                    console.log(error.response)
                    if (error.response.status === 400) {
                        history.push('/')
                    }
                }
            }
        }
    }
    useEffect(() => {
        fetchOffers().then((response) => {
            console.log(response)
            const filterOffers = []
            for (let i = response.length - 1; i >= 0; i--) {
                if (response[i].offer.active === true) {
                    filterOffers.push(response[i])
                }
            }
            setOffers(filterOffers)
        })

    }, [])

    const handleChangePage = (page) => {
        setCurrentPage(page)
    }

    return (
        <div className='main_dashboard--container'>
            <h2>Most recent offers</h2>
            {
                offers ?
                    <div>
                        {offers.map((offer, index) => {
                            if (index >= (currentPage - 1) * 4 && index < currentPage * 4) {
                                return <JobOffer key={offer.offer.id} offer={offer} />
                            }
                        })}
                        <Pagination defaultCurrent={1} total={offers.length} defaultPageSize={4} onChange={(page) => handleChangePage(page)} />
                    </div>
                    : <p></p>
            }
        </div>
    )
}

export default MainDashboard