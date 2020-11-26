import { combineReducers } from 'redux';
import message from './message_reducer';
import jobOffer from './jobOffer_reducer'
import userEmployee from './userEmployee'
import user from './user'
import userEmployeer from './userEmployeer'
import filtring from './filtring'

const rootReducer = combineReducers({
    message,
    jobOffer,
    user,
    userEmployee,
    userEmployeer,
    filtring
});

export default rootReducer;