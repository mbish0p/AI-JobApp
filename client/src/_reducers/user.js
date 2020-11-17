import {
    SAVE_USER_DATA
} from '../_actions/types'

const initialState = {
    userId: undefined,
    name: undefined,
    surname: undefined,
    email: undefined,
    isEmployeer: undefined
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_USER_DATA: {
            return {
                ...state,
                userId: action.payload.userId,
                name: action.payload.name,
                surname: action.payload.surname,
                email: action.payload.email,
                isEmployeer: action.payload.isEmployeer
            }
        }
        default:
            return state
    }
}