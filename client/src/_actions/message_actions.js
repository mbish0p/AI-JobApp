import {
    SAVE_MESSAGE,
    DELETE_MESSAGE
} from './types';

export function saveMessage(dataToSubmit) {

    return {
        type: SAVE_MESSAGE,
        payload: dataToSubmit
    }
}

export function deleteMessage(messageId) {
    return {
        type: DELETE_MESSAGE,
        payload: messageId
    }
}
