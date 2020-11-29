import { SAVE_ALL_OFFERS } from '../_actions/types.js'

const initialState = {
    offers: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_ALL_OFFERS:
            return {
                ...state,
                offers: action.payload
            }
        default:
            return state
    }
}