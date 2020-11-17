import { combineReducers } from 'redux';
import message from './message_reducer';
import jobOffer from './jobOffer_reducer'
import userEmployee from './userEmployee'
import user from './user'
import userEmployeer from './userEmployeer'

const rootReducer = combineReducers({
    message,
    jobOffer,
    user,
    userEmployee,
    userEmployeer
});

export default rootReducer;