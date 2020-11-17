import {
    SAVE_EMPLOYEER_DATA,
    SAVE_EMPLOYEER_LOGO,
    SAVE_EMPLOYEER_OFFICES,
    SAVE_EMPLOYEER_TECHNOLOGIES,
    SAVE_EMPLOYEER_WWW,
    SAVE_EMPLOYEER_EMPLOYEES_NUMBER,
    SAVE_EMPLOYEER_COMPANY_NAME,
    SAVE_EMPLOYEER_DESCRIPTION_ONE,
    SAVE_EMPLOYEER_DESCRIPTION_TWO,
    SAVE_EMPLOYEER_DESCRIPTION_THREE,
    SAVE_EMPLOYEER_FETCHED_TECHNOLOGIES,
    SAVE_EMPLOYEER_FETCHED_OFFICES
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
    textarea_three: undefined,
    offices: [],
    technologies: [],
    fetched_offices: [],
    fetched_technologies: []
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
                textarea_one: action.payload
            }
        }
        case SAVE_EMPLOYEER_DESCRIPTION_TWO: {
            return {
                ...state,
                textarea_two: action.payload
            }
        }
        case SAVE_EMPLOYEER_DESCRIPTION_THREE: {
            return {
                ...state,
                textarea_three: action.payload
            }
        }
        case SAVE_EMPLOYEER_COMPANY_NAME: {
            return {
                ...state,
                company_name: action.payload.company_name
            }
        }
        case SAVE_EMPLOYEER_EMPLOYEES_NUMBER: {
            return {
                ...state,
                employee_number: action.payload.employee_number
            }
        }
        case SAVE_EMPLOYEER_WWW: {
            return {
                ...state,
                www: action.payload.www
            }
        }
        case SAVE_EMPLOYEER_TECHNOLOGIES: {
            return {
                ...state,
                technologies: action.payload
            }
        }
        case SAVE_EMPLOYEER_OFFICES: {
            return {
                ...state,
                offices: action.payload
            }
        }
        case SAVE_EMPLOYEER_FETCHED_OFFICES: {
            console.log(action)
            return {
                ...state,
                fetched_offices: action.payload
            }
        }
        case SAVE_EMPLOYEER_FETCHED_TECHNOLOGIES: {
            return {
                ...state,
                fetched_technologies: action.payload
            }
        }
        default:
            return state
    }
}