import {
    SAVE_MESSAGE,
    DELETE_MESSAGE
} from '../_actions/types';

export default function (state = { messages: [] }, action) {
    switch (action.type) {
        case SAVE_MESSAGE:
            return {
                ...state,
                messages: state.messages.concat(action.payload)
            }
        case DELETE_MESSAGE: {
            return {
                messages: state.messages.filter((message) => {
                    return message.id !== action.payload
                })
            }
        }
        default:
            return state;
    }
}