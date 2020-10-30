import {
    SAVE_USER_DATA,
    SAVE_EMPLOYEE_PHOTO
} from './types'

export function saveUserData(userData) {
    return {
        type: SAVE_USER_DATA,
        payload: userData
    }
}

export function saveEmployeePhoto(imgUrl) {
    return {
        type: SAVE_EMPLOYEE_PHOTO,
        payload: imgUrl
    }
}