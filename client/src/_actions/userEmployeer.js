import {
    SAVE_EMPLOYEER_DATA,
    SAVE_EMPLOYEER_LOGO,
    SAVE_EMPLOYEER_OFFICES,
    SAVE_EMPLOYEER_TECHNOLOGIES,
    SAVE_EMPLOYEER_DESCRIPTION_ONE,
    SAVE_EMPLOYEER_DESCRIPTION_TWO,
    SAVE_EMPLOYEER_DESCRIPTION_THREE
} from './types'

export function saveEmployeerData(employeerData) {
    return {
        type: SAVE_EMPLOYEER_DATA,
        payload: employeerData
    }
}

export function saveEmployeerOffices(employeerOffices) {
    return {
        type: SAVE_EMPLOYEER_OFFICES,
        payload: employeerOffices
    }
}

export function saveEmployeerTechs(employeerTechs) {
    return {
        type: SAVE_EMPLOYEER_TECHNOLOGIES,
        payload: employeerTechs
    }
}

export function saveEmployeerLogo(imgUrl) {
    return {
        type: SAVE_EMPLOYEER_LOGO,
        payload: imgUrl
    }
}

export function saveDescriptionOne(description) {
    return {
        type: SAVE_EMPLOYEER_DESCRIPTION_ONE,
        payload: description
    }
}

export function saveDescriptionTwo(description) {
    return {
        type: SAVE_EMPLOYEER_DESCRIPTION_TWO,
        payload: description
    }
}

export function saveDescriptionThree(description) {
    return {
        type: SAVE_EMPLOYEER_DESCRIPTION_THREE,
        payload: description
    }
}