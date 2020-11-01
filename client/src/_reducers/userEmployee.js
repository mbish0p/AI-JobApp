import {
    SAVE_EMPLOYEE_PHOTO
} from '../_actions/types'

const initialState = {
    employee_photo: undefined
}

export default function (state = initialState, action) {
    switch (action.type) {
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