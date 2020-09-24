import { SAVE_JOB_CATEGORY, SAVE_POSITION_NAME, SAVE_EXPERIENCE_LVL } from '../_actions/types'

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
    description: undefined
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
        default:
            return state
    }
}