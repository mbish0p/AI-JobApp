import {
    SAVE_EMPLOYEER_DATA,
    SAVE_EMPLOYEER_LOGO
} from '../_actions/types'

const initialState = {
    employeerId: undefined,
    company_name: undefined,
    phone_number: undefined,
    company_logo: undefined
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_EMPLOYEER_DATA: {
            return {
                ...state,
                employeerId: action.payload.employeerId,
                company_name: action.payload.company_name,
                phone_number: action.payload.phone_number,
            }
        }
        case SAVE_EMPLOYEER_LOGO: {
            return {
                ...state,
                company_logo: action.company_logo
            }
        }
        default:
            return state
    }
}