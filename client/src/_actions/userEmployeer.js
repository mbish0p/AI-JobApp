import {
    SAVE_EMPLOYEER_DATA,
    SAVE_EMPLOYEER_LOGO
} from './types'

export function saveEmployeerData(employeerData) {
    return {
        type: SAVE_EMPLOYEER_DATA,
        payload: employeerData
    }
}

export function saveEmployeerLogo(imgUrl) {
    return {
        type: SAVE_EMPLOYEER_LOGO,
        payload: imgUrl
    }
}