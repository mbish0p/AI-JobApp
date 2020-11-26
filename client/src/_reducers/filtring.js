import {
    SAVE_FILTRING_TECH_NAME,
    SAVE_FILTRING_EXPERIENCE,
    SAVE_FILTRING_LOCATION,
    SAVE_FILTRING_TECHS,
    SAVE_FILTRING_POSTIONS
} from '../_actions/types'


const initialState = {
    loaction: '',
    tech_name: '',
    experiences: [],
    techs: [],
    positions: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_FILTRING_TECH_NAME:
            return {
                ...state,
                tech_name: action.payload
            }
        case SAVE_FILTRING_EXPERIENCE:
            return {
                ...state,
                experiences: action.payload
            }
        case SAVE_FILTRING_LOCATION:
            return {
                ...state,
                loaction: action.payload
            }
        case SAVE_FILTRING_TECHS:
            return {
                ...state,
                techs: action.payload
            }
        case SAVE_FILTRING_POSTIONS:
            return {
                ...state,
                positions: action.payload
            }
        default:
            return state
    }
}