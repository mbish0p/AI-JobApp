import React, { useState } from 'react'
import moment from 'moment';

const EmployeerJobOfferDisplay = (props) => {
    const activeOffers = props.activeOffers
    const archivalOffers = props.archivalOffers
    const futureOffers = props.futureOffers

    const [activeOffersButton, setActiveOffersButton] = useState(true)
    const [archivalOffersButton, setArchivalOffersButton] = useState(false)
    const [futureOffersButton, setFutureOffersButton] = useState(false)

    const handleActiveButton = () => {
        setActiveOffersButton(true)
        setArchivalOffersButton(false)
        setFutureOffersButton(false)
    }

    const handleArchivalButton = () => {
        setActiveOffersButton(false)
        setArchivalOffersButton(true)
        setFutureOffersButton(false)
    }

    const handleFutureButton = () => {
        setActiveOffersButton(false)
        setArchivalOffersButton(false)
        setFutureOffersButton(true)
    }

    const ActiveOffers = () => {
        return (
            <div>
                {
                    activeOffers ?
                        activeOffers.map((offer, index) => {
                            const startDate = moment(offer.offer.start_date).format("D MMMM YYYY")
                            const endDate = moment(offer.offer.end_date).format("D MMMM YYYY")
                            return <div key={index} className='employeer--offer--istance'>
                                <p className='employeer--offer--istance-name'>{offer.offer.title}</p>
                                <p className='employeer--offer--istance-start-date'>{startDate}</p>
                                <p className='employeer--offer--istance-end-date'>{endDate}</p>
                            </div>
                        }) : <p></p>
                }
            </div>
        )
    }

    const ArchivalOffers = () => {
        console.log('archivaaaaal',)
        return (
            <div>
                {
                    archivalOffers ?
                        archivalOffers.map((offer, index) => {
                            const startDate = moment(offer.offer.start_date).format("D MMMM YYYY")
                            const endDate = moment(offer.offer.end_date).format("D MMMM YYYY")
                            return <div key={index} className='employeer--offer--istance'>
                                <p className='employeer--offer--istance-name'>{offer.offer.title}</p>
                                <p className='employeer--offer--istance-start-date'>{startDate}</p>
                                <p className='employeer--offer--istance-end-date'>{endDate}</p>
                            </div>
                        }) : <p></p>
                }
            </div>
        )
    }

    const FutureOffers = () => {
        return (
            <div>
                {
                    futureOffers ?
                        futureOffers.map((offer, index) => {
                            const startDate = moment(offer.offer.start_date).format("D MMMM YYYY")
                            const endDate = moment(offer.offer.end_date).format("D MMMM YYYY")
                            return <div key={index} className='employeer--offer--istance'>
                                <p className='employeer--offer--istance-name'>{offer.offer.title}</p>
                                <p className='employeer--offer--istance-start-date'>{startDate}</p>
                                <p className='employeer--offer--istance-end-date'>{endDate}</p>
                            </div>
                        }) : <p></p>
                }
            </div>
        )
    }

    const Offers = () => {
        if (activeOffersButton) {
            return <ActiveOffers />
        }
        if (archivalOffersButton) {
            return <ArchivalOffers />
        }
        if (futureOffersButton) {
            return <FutureOffers />
        }
    }

    return (
        <div>
            <h2>Your job offers</h2>
            <div>
                <button onClick={() => handleActiveButton()}>Active</button>
                <button onClick={() => handleArchivalButton()}>Archival</button>
                <button onClick={() => handleFutureButton()}>Future</button>
            </div>
            <div className="employeer--offer-tab-header">
                <p className="employeer--offer-tab-name">Offer name</p>
                <p className="employeer--offer-tab-start">Start date</p>
                <p className="employeer--offer-tab-end">End date</p>
            </div>
            <Offers />
        </div>
    )
}

export default EmployeerJobOfferDisplay