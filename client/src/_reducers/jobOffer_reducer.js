import {
    SAVE_JOB_CATEGORY,
    SAVE_POSITION_NAME,
    SAVE_EXPERIENCE_LVL,
    SAVE_CONTRACT_TYPE,
    SAVE_CITY_ADDRESS,
    SAVE_MAX_SALARY,
    SAVE_MIN_SALARY,
    SAVE_REMOTE_WORK,
    SAVE_STREET_ADDRESS,
    SAVE_DESCRIPTION,
    SAVE_RECRUITMENT_TYPE,
    SAVE_TECHNOLOGIES,
    SAVE_START_DATE,
    SAVE_END_DATE,
    SAVE_CURRENCY,
    SAVE_TECHNOLOGIES_V2,
    SAVE_EMPLOYEER_EDUCATION
}
    from '../_actions/types'

const initialState = {
    job_category: undefined,
    offer_title: undefined,
    experience_level: undefined,
    city: undefined,
    street: undefined,
    remote_work: undefined,
    contract_type: undefined,
    min_salary: undefined,
    max_salary: undefined,
    description: undefined,
    recruitmentOnline: undefined,
    start_date: undefined,
    education: undefined,
    end_date: undefined,
    currency: undefined,
    technologies: []
}


export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_JOB_CATEGORY:
            return {
                ...state,
                job_category: action.payload
            }
        case SAVE_POSITION_NAME:
            return {
                ...state,
                offer_title: action.payload
            }
        case SAVE_EXPERIENCE_LVL:
            return {
                ...state,
                experience_level: action.payload
            }
        case SAVE_STREET_ADDRESS:
            return {
                ...state,
                street: action.payload
            }
        case SAVE_CITY_ADDRESS:
            return {
                ...state,
                city: action.payload
            }
        case SAVE_CONTRACT_TYPE:
            return {
                ...state,
                contract_type: action.payload
            }
        case SAVE_REMOTE_WORK:
            return {
                ...state,
                remote_work: action.payload
            }
        case SAVE_MIN_SALARY:
            return {
                ...state,
                min_salary: action.payload
            }
        case SAVE_MAX_SALARY:
            return {
                ...state,
                max_salary: action.payload
            }
        case SAVE_DESCRIPTION:
            return {
                ...state,
                description: action.payload
            }
        case SAVE_RECRUITMENT_TYPE:
            return {
                ...state,
                recruitmentOnline: action.payload
            }
        case SAVE_TECHNOLOGIES:
            return {
                ...state,
                technologies: state.technologies.concat(action.payload)
            }
        case SAVE_TECHNOLOGIES_V2:
            return {
                ...state,
                technologies: action.payload
            }
        case SAVE_START_DATE:
            return {
                ...state,
                start_date: action.payload
            }
        case SAVE_END_DATE:
            return {
                ...state,
                end_date: action.payload
            }
        case SAVE_CURRENCY:
            return {
                ...state,
                currency: action.payload
            }
        case SAVE_EMPLOYEER_EDUCATION: {
            return {
                ...state,
                education: action.payload
            }
        }
        default:
            return state
    }
}