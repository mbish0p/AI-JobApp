import { combineReducers } from 'redux';
import message from './message_reducer';
import jobOffer from './jobOffer_reducer'
import userEmployee from './userEmployee'

const rootReducer = combineReducers({
    message,
    jobOffer,
    userEmployee
});

export default rootReducer;