import { combineReducers } from 'redux';
import users from '../components/Users/users.reducer';

const rootReducer = combineReducers({
	users
});

export default rootReducer;
