const JobOffer = require('../models/JobOffer')

const changeJobOfferStatus = () => {
    setInterval(async () => {
        const date = new Date()
        const timeTolerance = 600000

        const jobOffers = await JobOffer.findAll()
        for (let i = 0; i < jobOffers.length; i++) {

            const offer = jobOffers[i].dataValues
            const offerStartDate = offer.start_date
            const offerEndDate = offer.end_date
            const offerId = offer.id

            const setActive = Math.abs(offerStartDate - date)
            const setDisactive = Math.abs(offerEndDate - date)

            if (setActive < timeTolerance) {
                if (offer.active === false) {
                    await JobOffer.update({
                        active: true
                    }, {
                        where: {
                            id: offerId
                        }
                    })
                }
            }
            if (setDisactive < timeTolerance) {
                if (offer.active === true) {
                    await JobOffer.update({
                        active: false
                    }, {
                        where: {
                            id: offerId
                        }
                    })
                }
            }
        }
    }, 900000)
}

module.exports = changeJobOfferStatus