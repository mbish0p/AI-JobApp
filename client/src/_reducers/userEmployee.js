import {
    SAVE_USER_DATA,
    SAVE_EMPLOYEE_PHOTO
} from '../_actions/types'

const initialState = {
    userId: undefined,
    name: undefined,
    surname: undefined,
    email: undefined,
    employee_photo: undefined
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_USER_DATA: {
            return {
                ...state,
                userId: action.payload.userId,
                name: action.payload.name,
                surname: action.payload.surname,
                email: action.payload.email
            }
        }
        case SAVE_EMPLOYEE_PHOTO: {
            return {
                ...state,
                employee_photo: action.payload
            }
        }
        default:
            return state
    }
}