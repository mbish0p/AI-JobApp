import { combineReducers } from 'redux';
import message from './message_reducer';
import jobOffer from './jobOffer_reducer'

const rootReducer = combineReducers({
    message,
    jobOffer
});

export default rootReducer;