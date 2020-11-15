import {
    SAVE_EMPLOYEER_DATA,
    SAVE_EMPLOYEER_LOGO,
    SAVE_EMPLOYEER_OFFICES,
    SAVE_EMPLOYEER_TECHNOLOGIES,
    SAVE_EMPLOYEER_DESCRIPTION_ONE,
    SAVE_EMPLOYEER_DESCRIPTION_TWO,
    SAVE_EMPLOYEER_DESCRIPTION_THREE
} from '../_actions/types'

const initialState = {
    employeerId: undefined,
    company_name: undefined,
    phone_number: undefined,
    company_logo: undefined,
    www: undefined,
    employee_number: undefined,
    textarea_one: undefined,
    textarea_two: undefined,
    textarea_three: undefined
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_EMPLOYEER_DATA: {
            console.log(action)
            return {
                ...state,
                employeerId: action.payload.employeerId,
                company_name: action.payload.company_name,
                phone_number: action.payload.phone_number,
                company_logo: action.payload.company_logo,
                www: action.payload.www,
                employee_number: action.payload.employee_number
            }
        }
        case SAVE_EMPLOYEER_LOGO: {
            return {
                ...state,
                company_logo: action.payload.company_logo
            }
        }
        case SAVE_EMPLOYEER_DESCRIPTION_ONE: {
            return {
                ...state,
                textarea_one: action.payload.description
            }
        }
        case SAVE_EMPLOYEER_DESCRIPTION_TWO: {
            return {
                ...state,
                textarea_two: action.payload.description
            }
        }
        case SAVE_EMPLOYEER_DESCRIPTION_THREE: {
            return {
                ...state,
                textarea_three: action.payload.description
            }
        }
        default:
            return state
    }
}