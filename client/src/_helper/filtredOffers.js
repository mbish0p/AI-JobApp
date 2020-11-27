import { useSelector } from 'react-redux'

const getFiltredOffers = () => {
    const offers = useSelector(state => state.offers)
    const { location, tech_name, experiences, techs, positions } = useSelector(state => state.filtring)

    const sortedOffers = []

    for (let i = offers.offers.length - 1; i >= 0; i--) {
        sortedOffers.push(offers.offers[i])
    }

    return sortedOffers.filter(({ offer, technology }) => {

        const city = location === undefined || (offer.city !== null && offer.city.includes(location))
        let position_name = positions.length === 0
        let technologyBool = (tech_name === undefined && techs.length === 0) || (tech_name === '' && techs.length === 0)
        let experience_lvl = experiences.length === 0

        experiences.forEach((exp) => {
            if (exp.name === offer.experience_lvl) experience_lvl = true
        })

        const positionsFillter = []
        positions.forEach((position) => {
            positionsFillter.push(position.name)
        })
        if (positionsFillter.includes(offer.position_name)) position_name = true

        const offerTechs = []
        technology.forEach((tech) => {
            offerTechs.push(tech.name)
        })
        techs.forEach((tech) => {
            if (offerTechs.includes(tech.name)) technologyBool = true
        })

        if (offerTechs.includes(tech_name)) technologyBool = true


        return city && position_name && technologyBool && experience_lvl
    })
}

export default getFiltredOffers