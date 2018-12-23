import { combineReducers } from 'redux';
import User from './user';
import SignIn from './signIn';
import SignUp from './signUp';

export default combineReducers({
    User,
    SignIn,
    SignUp
});
