import {
    SAVE_FILTRING_TECH_NAME,
    SAVE_FILTRING_EXPERIENCE,
    SAVE_FILTRING_LOCATION,
    SAVE_FILTRING_TECHS,
    SAVE_FILTRING_POSTIONS
} from './types'

export function saveTechnologies(techs) {
    return {
        type: SAVE_FILTRING_TECHS,
        payload: techs
    }
}

export function saveTechName(tech_name) {
    return {
        type: SAVE_FILTRING_TECH_NAME,
        payload: tech_name
    }
}

export function saveExperience(experience) {
    return {
        type: SAVE_FILTRING_EXPERIENCE,
        payload: experience
    }
}

export function saveLocation(location) {
    return {
        type: SAVE_FILTRING_LOCATION,
        payload: location
    }
}

export function savePositions(positions) {
    return {
        type: SAVE_FILTRING_POSTIONS,
        payload: positions
    }
}
